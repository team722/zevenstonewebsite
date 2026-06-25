async function test() {
  try {
    const url = 'https://connect.zevenstone.com/zevenstone/form/websiteform/formperma/NkXcBE1CUcbQkq2l1m67xnpT6tHWJm-F0Xr7F5gmP5g';
    
    // 1. GET request to get cookies and CSRF
    const getRes = await fetch(url);
    const cookies = getRes.headers.get('set-cookie');
    const html = await getRes.text();
    
    console.log('Cookies:', cookies ? cookies.substring(0, 100) : 'none');
    
    const csrfMatch = html.match(/name="zf_csrftoken"\s+value="([^"]+)"/);
    const csrf = csrfMatch ? csrfMatch[1] : null;
    console.log('CSRF:', csrf);
    
    if (!csrf) return;

    // 2. POST request with CSRF and cookies
    const submitUrl = url + '/htmlRecords/submit';
    
    const formBody = new URLSearchParams({
      'zf_csrftoken': csrf,
      'Dropdown1': 'Mr.',
      'SingleLine': 'CSRFTest',
      'SingleLine1': 'User',
      'Email': 'csrftest@zevenstone.com',
      'Dropdown': '5K-10K',
      'MultiLine': 'Testing CSRF bypass'
    });

    const postRes = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookies,
        'Origin': 'https://connect.zevenstone.com',
        'Referer': url
      },
      body: formBody.toString(),
      redirect: 'manual'
    });

    console.log('POST Status:', postRes.status);
    console.log('Location:', postRes.headers.get('location'));
  } catch (e) {
    console.error(e);
  }
}
test();
