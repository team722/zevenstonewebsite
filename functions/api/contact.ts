const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
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

    // Honeypot check for basic spam protection
    // If the hidden 'botField' is filled out, we silently drop the submission
    // but return success to fool the bot.
    if (data.botField) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Prepare the document mutation for Sanity
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

    // Get config from environment variables (fallback to known values if not set)
    const projectId = env.SANITY_PROJECT_ID || 'h79epwt4';
    const dataset = env.SANITY_DATASET || 'production';
    const token = env.SANITY_WRITE_TOKEN;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing Sanity Token' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sanityUrl = `https://${projectId}.api.sanity.io/v2023-08-01/data/mutate/${dataset}`;

    const sanityResponse = await fetch(sanityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mutation),
    });

    const sanityResult = await sanityResponse.json();

    if (!sanityResponse.ok) {
      console.error('Sanity Error:', JSON.stringify(sanityResult));
      return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Submission successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
