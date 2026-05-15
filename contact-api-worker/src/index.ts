export interface Env {
  SANITY_WRITE_TOKEN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  // Zoho OAuth2 credentials (from Zoho API Console)
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REFRESH_TOKEN: string;
  // Zoho Forms identifiers
  ZOHO_FORM_LINK_NAME: string; // e.g. "websiteform"
  ZOHO_PORTAL_NAME: string;    // e.g. "zevenstone"
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
      const isLandingPage = !!data.formType;
      const sanityDocumentType = isLandingPage ? 'landingPageSubmission' : 'contactSubmission';

      const sanityDocument: any = {
        _type: sanityDocumentType,
        title: data.title || '',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: 'New',
        submittedAt: new Date().toISOString(),
      };

      // Map specific fields based on document type
      if (isLandingPage) {
        sanityDocument.formType = data.formType;
        sanityDocument.phone = data.phone || '';
        sanityDocument.agencyName = data.agencyName || '';
        sanityDocument.challenge = data.challenge || '';
      } else {
        sanityDocument.budget = data.budget || '';
        sanityDocument.expectations = data.expectations || '';
      }

      const mutation = {
        mutations: [
          {
            create: sanityDocument,
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

      // 2. Submit to Zoho Forms via Official REST API (OAuth2)
      let zohoError = null;
      let zohoSuccess = false;

      if (env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN) {
        try {
          // Step 2a: Exchange Refresh Token for Access Token
          const tokenParams = new URLSearchParams({
            refresh_token: env.ZOHO_REFRESH_TOKEN,
            client_id: env.ZOHO_CLIENT_ID,
            client_secret: env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token',
          });

          // Using .com instead of .in for broader compatibility
          const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: tokenParams.toString(),
          });

          const tokenData: any = await tokenResponse.json();

          if (!tokenData.access_token) {
            zohoError = `Token error: ${JSON.stringify(tokenData)}`;
            console.error('Zoho token error:', zohoError);
          } else {
            // Step 2b: Add entry via Zoho Forms REST API
            const entryPayload: any = {
              data: {
                Dropdown1: data.title || '',        // Title
                SingleLine: data.firstName || '',    // First Name
                SingleLine1: data.lastName || '',    // Last Name
                Email: data.email || '',             // Email
              },
            };

            // Dynamic mapping for both form types
            if (isLandingPage) {
              entryPayload.data.SingleLine2 = data.agencyName || ''; // Agency Name
              entryPayload.data.PhoneNumber = data.phone || '';     // Phone Number
              entryPayload.data.MultiLine1 = data.challenge || '';   // Challenge
              entryPayload.data.SingleLine3 = data.formType || '';   // Form Type
            } else {
              entryPayload.data.Dropdown = data.budget || '';        // Budget
              entryPayload.data.MultiLine = data.expectations || ''; // Expectations
            }

            const apiUrl = `https://forms.zoho.com/api/v1/${env.ZOHO_PORTAL_NAME}/forms/${env.ZOHO_FORM_LINK_NAME}/entries`;

            const zohoApiResponse = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(entryPayload),
            });

            const zohoApiResult: any = await zohoApiResponse.json();
            zohoSuccess = zohoApiResponse.ok;

            if (!zohoSuccess) {
              zohoError = JSON.stringify(zohoApiResult);
              console.error('Zoho API Error:', zohoError);
            }
          }
        } catch (e: any) {
          zohoError = e.message;
          console.error('Zoho Fetch Error:', e);
        }
      } else {
        zohoError = 'Missing Zoho OAuth2 configuration';
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
