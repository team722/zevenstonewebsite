export interface Env {
  SANITY_WRITE_TOKEN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REFRESH_TOKEN: string;
  ZOHO_PORTAL_NAME: string;
  ZOHO_FORM_LINK_NAME: string;
  ZOHO_LANDING_FORM_NAME: string;
  ZOHO_LANDING_PERMA: string;
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

      // Honeypot spam protection
      if (data.website_url && data.website_url.trim() !== '') {
        console.warn('Spam detected via honeypot');
        return new Response(JSON.stringify({ success: true, message: 'Submission successful' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const isWebsiteLandingPage = data.pageSource === 'websiteLandingPage';
      const isLandingPage = !!data.formType && !isWebsiteLandingPage;
      const sanityDocumentType = isWebsiteLandingPage 
        ? 'websiteLandingPageSubmission' 
        : (isLandingPage ? 'landingPageSubmission' : 'contactSubmission');

      // ── 1. Save to Sanity ────────────────────────────────────────────────
      const sanityDocument: any = {
        _type: sanityDocumentType,
        title: data.title || '',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: 'New',
        submittedAt: new Date().toISOString(),
      };

      if (isWebsiteLandingPage) {
        sanityDocument.formType   = data.formType;
        sanityDocument.phone      = data.phone      || '';
        sanityDocument.businessName = data.businessName || '';
        sanityDocument.growthChallenges = data.growthChallenges || [];
      } else if (isLandingPage) {
        sanityDocument.formType   = data.formType;
        sanityDocument.phone      = data.phone      || '';
        sanityDocument.businessName = data.businessName || '';
        sanityDocument.challenge  = data.challenge  || '';
      } else {
        sanityDocument.budget       = data.budget       || '';
        sanityDocument.expectations = data.expectations || '';
      }

      const mutation = { mutations: [{ create: sanityDocument }] };

      const projectId = env.SANITY_PROJECT_ID;
      const dataset   = env.SANITY_DATASET;
      const token     = env.SANITY_WRITE_TOKEN;

      let sanitySuccess = false;
      let sanityError: any = null;

      if (token) {
        const sanityUrl = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`;
        const sanityResponse = await fetch(sanityUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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

      // ── 2. Submit to Zoho Forms via Official REST API (OAuth2) ───────────
      let zohoError: any = null;
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

          // India Data Center
          const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
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
                Dropdown1: data.title || '',
                SingleLine: data.firstName || '',
                SingleLine1: data.lastName || '',
                Email: data.email || '',
              },
            };

            const portalName = env.ZOHO_PORTAL_NAME || 'zevenstone';
            let formLinkName = env.ZOHO_FORM_LINK_NAME || 'websiteform';

            if (isWebsiteLandingPage) {
              entryPayload.data.SingleLine2 = data.agencyName || '';
              entryPayload.data.PhoneNumber = data.phone || '';
              entryPayload.data.MultiLine1 = Array.isArray(data.growthChallenges) ? data.growthChallenges.join(', ') : '';
              entryPayload.data.SingleLine3 = data.formType || '';
              formLinkName = env.ZOHO_LANDING_FORM_NAME || 'ZevenstoneAgencyForm';
            } else if (isLandingPage) {
              entryPayload.data.SingleLine2 = data.agencyName || '';
              entryPayload.data.PhoneNumber = data.phone || '';
              entryPayload.data.MultiLine1 = data.challenge || '';
              entryPayload.data.SingleLine3 = data.formType || '';
              formLinkName = env.ZOHO_LANDING_FORM_NAME || 'ZevenstoneAgencyForm';
            } else {
              entryPayload.data.Dropdown = data.budget || '';
              entryPayload.data.MultiLine = data.expectations || '';
            }

            const apiUrl = `https://forms.zoho.in/api/v1/${portalName}/forms/${formLinkName}/entries`;

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

      return new Response(JSON.stringify({
        success: sanitySuccess || zohoSuccess,
        sanity:  { success: sanitySuccess, error: sanityError },
        zoho:    { success: zohoSuccess,   error: zohoError },
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
