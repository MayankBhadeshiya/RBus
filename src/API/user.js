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
      return true;
    } else {
      console.log(response.status);
      return false;
    }
  } catch (err) {
    console.log(err.message);
    return false;
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
        return result;
      } else {
        console.log(response.status);
        return "noData";
      }
    } catch (err) {
      console.log(err.message);
      return "noData";
    }
}