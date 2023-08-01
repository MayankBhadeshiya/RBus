const BASEURL = 'http://192.168.102.116:8000';

export async function getOTP(OTP, email) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    OTP: OTP,
    email: email,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${BASEURL}/send_otp`, requestOptions);
    if (response.status === 200) {
      const result = await response.json();
      return {success: true, status: response.status};
    } else {
      console.log(response.status);
      return {success: false, status: response.status};
    }
  } catch (err) {
    console.log(err.message);
    return {success: false, status: 'unknown'};
  }
}

export async function getToken(email){
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      const response = await fetch(`${BASEURL}/registerUser`, requestOptions);
      if (response.status === 200) {
        const result = await response.json();
        return {result, status: response.status};
      } else {
        console.log(response.status);
        return {result:'noData', status: response.status};
      }
    } catch (err) {
      console.log(err.message);
      return {result: 'noData', status: 'unknown'};
    }
}