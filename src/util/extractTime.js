export const extractDepattureTime = departureTime => {
  const date = new Date(departureTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
};

export const extractArrivalTime = (arrivalTime, departureTime) => {
  const date = new Date(arrivalTime);
  const currentDate = new Date(departureTime);
  const sameday =
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  if (!sameday) {
    const d = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    });

    return formattedTime + ' ' + d;
  } else {
    return formattedTime;
  }
};