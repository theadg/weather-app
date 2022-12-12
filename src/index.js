import './styles/style.scss';
import clearDay from './assets/conditions/clearDay.png';
import Icons from './components/icons';

const weatherLocation = document.querySelector('#weatherLocation');
const getWeatherButton = document.querySelector('#getWeather');
const weatherIcon = document.querySelector('#weatherIcon');

const locationName = document.querySelector('#locationName');
const locationTemp = document.querySelector('#locationTemp');
const locationFeelsLike = document.querySelector('#locationFeelsLike');
const locationCloud = document.querySelector('#locationCloud');
const locationHumidity = document.querySelector('#locationHumidity');
const locationWind = document.querySelector('#locationWind');

const ct = require('countries-and-timezones');

export const getDate = (country) => {
  const currentCountry = ct.getCountry(country);
  // getting current time
  const currentDate = new Date()
    .toLocaleTimeString('en-US', {
      timeZone: currentCountry.timezones[0],
    })
    .toString();

  const timeOfDay = currentDate.charAt(currentDate.length - 2);

  return currentDate;
};

const dummyForecastIcon = Array.from(
  document.querySelectorAll('.forecast__icon')
);

dummyForecastIcon.forEach((icon) => {
  icon.src = clearDay;
});

const setLocationData = (data) => {
  console.log(data);
  getDate(data.sys.country);
  locationName.textContent = data.name;
  locationTemp.textContent = `${Math.round(data.main.temp)}°`;
  locationFeelsLike.textContent = `Feels like ${data.main.feels_like}°`;
  locationCloud.textContent = `${data.clouds.all}%`;

  locationHumidity.textContent = `${data.main.humidity}%`;
  locationWind.textContent = `${data.wind.speed * 10} km`;

  // TODO: replace this with function
  // weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.src = Icons();
};
const getWeather = async (location, unit = 'metric') => {
  if (location === '') {
    // throw error or alert here
  }

  //   this gets the data as a promise from the api
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
  );

  //   this transforms the promise into usable data
  const weatherData = await response.json();
  // console.log(weatherData);
  setLocationData(weatherData);
};

const getForecast = async (location, unit = 'metric') => {
  if (location === '') {
    // throw error or alert here
  }

  //   this gets the data as a promise from the api
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
  );

  //   this transforms the promise into usable data
  const weatherData = await response.json();
  console.log(weatherData);
};

// getWeatherButton.onclick = () => {
//   // add get weather function here
//   getWeather(weatherLocation.value);
//   //   console.log(weatherLocation.value);
// };

window.onload = () => {
  getWeather('London');
  getForecast('Taytay');
};

// get to display the data
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea

// trying to use the icon

// const getWeatherIcon = async (iconNumber) => {
//     `http://openweathermap.org/img/wn/${iconNumber}@2x.png`
// };

console.log(clearDay);
// weatherIcon.src = clearDay;

// TODO: import pngs and sort proper icon
