export interface Env {
  SANITY_WRITE_TOKEN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  BIGIN_PUBLIC_KEY: string;
  BIGIN_FORM_ID: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const data: any = await request.json();

      // Honeypot check for basic spam protection
      if (data.botField) {
        return new Response(JSON.stringify({ success: true, message: 'Message sent!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 1. Save to Sanity
      const mutation = {
        mutations: [
          {
            create: {
              _type: 'contactSubmission',
              title: data.title || '',
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              budget: data.budget || '',
              expectations: data.expectations,
              status: 'New',
              submittedAt: new Date().toISOString(),
            },
          },
        ],
      };

      const projectId = env.SANITY_PROJECT_ID;
      const dataset = env.SANITY_DATASET;
      const token = env.SANITY_WRITE_TOKEN;

      const sanityUrl = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`;

      let sanityError = null;
      let sanitySuccess = false;

      if (token) {
        const sanityResponse = await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mutation),
        });
        
        const sanityResult: any = await sanityResponse.json();
        sanitySuccess = sanityResponse.ok;
        
        if (!sanitySuccess) {
          sanityError = sanityResult;
          console.error('Sanity Error:', JSON.stringify(sanityResult));
        }
      } else {
        sanityError = 'Missing Sanity Token';
      }

      // 2. Forward to Zoho Bigin
      let biginError = null;
      let biginSuccess = false;

      if (env.BIGIN_PUBLIC_KEY && env.BIGIN_FORM_ID) {
        const biginForm = new FormData();
        biginForm.append('xnQsjsdp', env.BIGIN_PUBLIC_KEY);
        biginForm.append('xmIwtLD', env.BIGIN_FORM_ID);
        biginForm.append('actionType', 'Q29udGFjdHM=');
        biginForm.append('rmsg', 'true');
        biginForm.append('zc_gad', '');
        biginForm.append('returnURL', 'null');
        
        biginForm.append('CONTACTCF2', data.title || '-None-'); // Title (Company ID: CF2)
        biginForm.append('First Name', data.firstName || '');
        biginForm.append('Last Name', data.lastName || '');
        biginForm.append('Email', data.email || '');
        biginForm.append('CONTACTCF1', data.budget || '-None-'); // Budget (Stays CF1)
        biginForm.append('CONTACTCF3', data.expectations || ''); // Expectations (Company ID: CF3)

        const biginUrl = 'https://bigin.zoho.in/crm/WebForm';

        const biginResponse = await fetch(biginUrl, {
          method: 'POST',
          body: biginForm,
        });

        biginSuccess = biginResponse.ok;
        if (!biginSuccess) {
          biginError = await biginResponse.text();
          console.error('Bigin Error:', biginError);
        }
      } else {
        biginError = 'Missing Bigin configuration';
      }

      // Return status of both
      return new Response(JSON.stringify({ 
        success: sanitySuccess || biginSuccess, 
        sanity: { success: sanitySuccess, error: sanityError },
        bigin: { success: biginSuccess, error: biginError }
      }), {
        status: (sanitySuccess || biginSuccess) ? 200 : 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error: any) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
