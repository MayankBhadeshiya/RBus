import {BASEURLB} from '../constants/Url';

export async function getBusSeat(id) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    bus_id:id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${BASEURLB}/buses/get_available_seats`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}
