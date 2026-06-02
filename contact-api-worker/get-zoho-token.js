// Node 20 has native fetch

async function getRefreshToken() {
  const code = "1000.413c8176b775fc3fdb5a4c72da0edc22.136db978e3e01ec52a0b951c0491e08e"; // PASTE NEW CODE HERE
  
  const params = new URLSearchParams();
  params.append('client_id', '1000.T8NVXCDGUZE4HYTP7LYSUKGL9ELPXF');
  params.append('client_secret', 'd69912b8acea12c545fdd6ca5c21bfe37e60ddc544');
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  // params.append('redirect_uri', 'http://localhost'); // Uncomment if your Zoho client requires a redirect URI

  try {
    const response = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    
    const data = await response.json();
    console.log("Response from Zoho:", data);
    
    if (data.refresh_token) {
      console.log("\n✅ SUCCESS! Your permanent Refresh Token is:");
      console.log(data.refresh_token);
      console.log("\nCopy this and put it in your wrangler.toml under ZOHO_REFRESH_TOKEN!");
    } else {
      console.log("\n❌ FAILED to get refresh token.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getRefreshToken();
