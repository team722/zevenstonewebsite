const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Honeypot spam protection
    if (data.botField || (data.website_url && data.website_url.trim() !== '')) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const isCaseStudy  = data.formSource === 'caseStudy';
    const isLandingPage = !!data.formType;
    const sanityDocumentType = isCaseStudy
      ? 'caseStudySubmission'
      : isLandingPage
        ? 'landingPageSubmission'
        : 'contactSubmission';

    // ── 1. Save to Sanity ──────────────────────────────────────────────────
    let sanityDocument: any;

    if (isCaseStudy) {
      sanityDocument = {
        _type: 'caseStudySubmission',
        name: data.name || '',
        email: data.email || '',
        company: data.company || '',
        goals: data.goals || '',
        caseStudySlug: data.caseStudySlug || '',
        status: 'New',
        submittedAt: new Date().toISOString(),
      };
    } else {
      sanityDocument = {
        _type: sanityDocumentType,
        title: data.title || '',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        status: 'New',
        submittedAt: new Date().toISOString(),
      };

      if (isLandingPage) {
        sanityDocument.formType    = data.formType;
        sanityDocument.phone       = data.phone       || '';
        sanityDocument.agencyName  = data.agencyName  || '';
        sanityDocument.challenge   = data.challenge   || '';
      } else {
        sanityDocument.budget       = data.budget       || '';
        sanityDocument.expectations = data.expectations || '';
      }
    }

    const mutation = { mutations: [{ create: sanityDocument }] };

    const projectId = env.SANITY_PROJECT_ID || 'h79epwt4';
    const dataset   = env.SANITY_DATASET    || 'production';
    const token     = env.SANITY_WRITE_TOKEN;

    let sanitySuccess = false;
    let sanityError: any = null;

    if (!token) {
      sanityError = 'Missing Sanity Token';
    } else {
      try {
        const sanityUrl = `https://${projectId}.api.sanity.io/v2023-08-01/data/mutate/${dataset}`;
        const sanityResponse = await fetch(sanityUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(mutation),
        });
        const sanityResult = await sanityResponse.json();
        sanitySuccess = sanityResponse.ok;
        if (!sanitySuccess) {
          sanityError = sanityResult;
          console.error('Sanity Error:', JSON.stringify(sanityResult));
        }
      } catch (err: any) {
        sanityError = err.message;
        console.error('Sanity Fetch Error:', err);
      }
    }

    // ── 2. Submit directly to Zoho Forms public URL ───────────────────────
    // Zoho Forms natively accepts the entry and its own internal workflow
    // then pushes the record to Zoho Bigin via the Forms → Bigin integration.
    let zohoSuccess = false;
    let zohoError: any = null;

    try {
      const portalName = env.ZOHO_PORTAL_NAME || 'zevenstone';

      let formLinkName: string;
      let formPerma: string;

      if (isCaseStudy || isLandingPage) {
        formLinkName = env.ZOHO_LANDING_FORM_NAME || 'ZevenstoneAgencyForm';
        formPerma    = env.ZOHO_LANDING_PERMA     || '';
      } else {
        formLinkName = env.ZOHO_FORM_LINK_NAME || 'websiteform';
        formPerma    = 'NkXcBE1CUcbQkq2l1m67xnpT6tHWJm-F0Xr7F5gmP5g';
      }

      // India Data Center public submit endpoint
      const zohoFormUrl = `https://forms.zohopublic.in/${portalName}/form/${formLinkName}/formperma/${formPerma}/htmlRecords/submit`;

      const formBody = new URLSearchParams();

      if (isCaseStudy) {
        formBody.append('SingleLine',  data.name      || '');
        formBody.append('Email',       data.email     || '');
        formBody.append('SingleLine2', data.company   || '');
        formBody.append('MultiLine1',  data.goals     || '');
        formBody.append('SingleLine3', 'Case Study Form');
      } else {
        // Common fields (field names mapped from Zoho Forms HTML source)
        formBody.append('Dropdown1',  data.title     || '');
        formBody.append('SingleLine', data.firstName || '');
        formBody.append('SingleLine1',data.lastName  || '');
        formBody.append('Email',      data.email     || '');

        if (isLandingPage) {
          formBody.append('SingleLine2', data.agencyName || '');
          formBody.append('PhoneNumber', data.phone      || '');
          formBody.append('MultiLine1',  data.challenge  || '');
          formBody.append('SingleLine3', data.formType   || '');
        } else {
          formBody.append('Dropdown',  data.budget       || '');
          formBody.append('MultiLine', data.expectations || '');
        }
      }

      const zohoResponse = await fetch(zohoFormUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      // Zoho Forms returns 200 for valid submissions regardless of browser session
      zohoSuccess = zohoResponse.ok;

      if (!zohoSuccess) {
        zohoError = await zohoResponse.text();
        console.error('Zoho Forms Submit Error:', zohoError);
      }
    } catch (e: any) {
      zohoError = e.message;
      console.error('Zoho Fetch Error:', e);
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
    console.error('Handler error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
