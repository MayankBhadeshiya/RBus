const isDeparted = givenTimeStr => {
  const givenTime = new Date(givenTimeStr);
  const currentTime = new Date();
  const timeDifferenceMs = givenTime - currentTime;
  const isDifferenceLessThanOneHour = timeDifferenceMs < 3600000;

  return isDifferenceLessThanOneHour;
};
export default isDeparted;