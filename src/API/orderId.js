import {BASEURLP} from '../constants/Url';

export async function getOrderId(amount) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    amount: amount,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${BASEURLP}/payment/get_payment`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result.razorpay_id;
    } else {
      console.log(response.status);
      return 'noData';
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}
