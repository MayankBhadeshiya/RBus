import {BASEURLB} from '../constants/Url';
import {BASEURLP} from '../constants/Url';

export async function getBusFilteredList(from, to, date, filters, sortBy, page) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    departure_location: from,
    arrival_location: to,
    departure_date: date,
    departure_time_before_6am: filters.sunrise,
    departure_time_6am_to_12pm: filters.day,
    departure_time_12pm_to_6pm: filters.sunset,
    departure_time_after_6pm: filters.night,
    ac: filters.AC,
    nonac: filters.NonAc,
    seater: filters.seater,
    sleeper: filters.sleeper,
    arrival_time_before_6am: false,
    arrival_time_6am_to_12pm: false,
    arrival_time_12pm_to_6pm: false,
    arrival_time_after_6pm: false,
    departure_date_sort_ascending: sortBy === 'earlyDeparture',
    departure_date_sort_descending: sortBy === 'lateDeparture',
    arrival_date_sort_ascending: false,
    arrival_date_sort_descending: false,
    ratings_sort_ascending: false,
    ratings_sort_descending: sortBy === 'bestRatedFirst',
    total_price_sort_ascending: sortBy === 'price-LowToHigh',
    total_price_sort_descending: false,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `${BASEURLP}/buses/get_buses_by_filter/?page=${page}`,
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
