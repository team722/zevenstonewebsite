export interface Env {
  SANITY_WRITE_TOKEN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  ZOHO_FORM_ACTION_URL: string;
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

      // 0. Improved Spam Protection (Honeypot)
      // We look for 'website_url' which bots love but humans won't see.
      if (data.website_url && data.website_url.trim() !== "") {
        console.warn('Spam detected via honeypot');
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Submission successful',
          note: 'Filtered as spam' 
        }), {
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

      // 2. Forward to Zoho Forms
      let zohoError = null;
      let zohoSuccess = false;

      if (env.ZOHO_FORM_ACTION_URL) {
        const zohoForm = new FormData();
        
        // Field Mapping based on Zoho Forms dashboard
        zohoForm.append('Dropdown1', data.title || ''); // Title
        zohoForm.append('SingleLine', data.firstName || ''); // First Name
        zohoForm.append('SingleLine1', data.lastName || ''); // Last Name
        zohoForm.append('Email', data.email || ''); // Email
        zohoForm.append('Dropdown', data.budget || ''); // Budget
        zohoForm.append('MultiLine', data.expectations || ''); // Expectations

        try {
          const zohoResponse = await fetch(env.ZOHO_FORM_ACTION_URL, {
            method: 'POST',
            body: zohoForm,
          });

          zohoSuccess = zohoResponse.ok;
          if (!zohoSuccess) {
            zohoError = await zohoResponse.text();
            console.error('Zoho Error:', zohoError);
          }
        } catch (e: any) {
          zohoError = e.message;
          console.error('Zoho Fetch Error:', e);
        }
      } else {
        zohoError = 'Missing Zoho configuration';
      }

      // Return status of both
      return new Response(JSON.stringify({ 
        success: sanitySuccess || zohoSuccess, 
        sanity: { success: sanitySuccess, error: sanityError },
        zoho: { success: zohoSuccess, error: zohoError }
      }), {
        status: (sanitySuccess || zohoSuccess) ? 200 : 500,
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
