const determineTime = (time, military) => {
  const timeOfDay = time.charAt(time.length - 2);
  const currentTimeFirstDigit = time.charAt(0);
  const currentTimeSecondDigit = time.charAt(1);
  let currentTime = currentTimeFirstDigit + currentTimeSecondDigit;

  currentTime = parseInt(currentTime, 10);

  if (military) {
    currentTime = time.slice(-8, -3);
    currentTime = parseInt(currentTime, 10);
    time = currentTime >= 5 && currentTime <= 18 ? 'Day' : 'Night';
  } else {
    time =
      timeOfDay === 'A' ||
      (timeOfDay === 'P' && (currentTime === 12 || currentTime <= 6))
        ? 'Day'
        : 'Night';
  }

  return time;
};

export default function Icons(condition, description, date, military = false) {
  let time = determineTime(date, military);
  let fileName = 'tShowerLight';
  // console.log(date, time);

  // determining the icon based on condition and description
  if (condition === 'Clouds') {
    if (description === 'few clouds' || description === 'scattered clouds') {
      fileName = 'cloudyLightMed';
    } else fileName = 'cloudyHeavy';
  } else if (condition === 'Clear') {
    description = 'clear';
  } else if (condition === 'Snow') {
    time = '';
    if (description === 'light snow' || description === 'Snow') {
      fileName = 'snowLightMedium';
    } else fileName = 'snowHeavy';
  } else if (condition === 'Rain' || condition === 'Drizzle') {
    fileName = 'rainLight';
    if (description === 'light rain' || description === 'moderate rain')
      fileName = 'rainHeavy';
  } else if (condition === 'Thunderstorm') {
    if (
      description === 'thunderstorm with light rain' ||
      description === 'thunderstorm with rain'
    ) {
      fileName = 'tShowerLight';
    } else fileName = 'tStormMediumHeavy';
  } else {
    fileName = 'clear';
  }

  //   const icon = require('../assets/conditions/' + fileName + time + '.png');
  const icon = require(`../assets/conditions/${fileName}${time}.png`);

  const currentWeatherIcon = icon;
  return currentWeatherIcon;
}

// TODO: work on search
// TODO: fix resolution of icons
