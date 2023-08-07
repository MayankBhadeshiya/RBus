import { BASEURLB } from "../constants/Url";

export async function bookSeat(details, transaction_id) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    bus_id: details.bus_id,
    booked_seats: details.booked_seats,
    email: details.email,
    phone_number: details.phone_number,
    transaction_id: transaction_id,
    amount: details.amount,
    departure_location: details.startingPoint,
    arrival_location: details.endingPoint,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${BASEURLB}/buses/add_booked_seats`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result.ticket_id;
    } else {
      console.log(response.status);
      return 'noData';
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}
