import {BASEURLP} from '../constants/Url';

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
    const response = await fetch(`${BASEURLP}/send_otp`, requestOptions);
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

export async function getToken(email) {
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
    const response = await fetch(`${BASEURLP}/registerUser`, requestOptions);
    if (response.status === 200) {
      const result = await response.json();
      return {result, status: response.status};
    } else {
      console.log(response.status);
      return {result: 'noData', status: response.status};
    }
  } catch (err) {
    console.log(err.message);
    return {result: 'noData', status: 'unknown'};
  }
}

export async function updateProfile(token, user) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    full_name: user.name,
    phone_number: user.phone,
    age: user.age,
    gender: user.gender,
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${BASEURLP}/update_profile`, requestOptions);
    if (response.status === 200) {
      const result = await response.json();
      return {result, status: response.status};
    } else {
      console.log(response.status);
      return {result: 'noData', status: response.status};
    }
  } catch (err) {
    console.log(err.message);
    return {result: 'noData', status: 'unknown'};
  }
}

export async function getTickets(email) {
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
    const response = await fetch(
      `${BASEURLP}/buses/user_tickets`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result.data;
    } else {
      console.log(response.status);
      return 'noData';
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}
