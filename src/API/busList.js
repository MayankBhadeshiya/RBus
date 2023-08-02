import {BASEURLB} from '../constants/Url';

export async function getBusList(from,to,date,page) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    departure_location: from,
    arrival_location: to,
    departure_date: date,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${BASEURLB}/buses/getlocationpoints/?page=${page}`,
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
