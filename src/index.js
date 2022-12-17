import './styles/style.scss';
import clearDay from './assets/conditions/clearDay.png';
import Icons from './components/icons';
import Today from './components/today';

const weatherLocation = document.querySelector('#searchBar');
const getWeatherButton = document.querySelector('#getWeather');
const weatherIcon = document.querySelector('#weatherIcon');
const searchError = document.querySelector('.search__error');

const weatherResult = document.querySelector('.weather__result');
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
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: currentCountry.timezones[0],
  });
  // .toString();

  // const timeOfDay = currentDate.charAt(currentDate.length - 2);
  return currentDate;
};

const dummyForecastIcon = Array.from(
  document.querySelectorAll('.forecast__icon')
);

dummyForecastIcon.forEach((icon) => {
  icon.src = clearDay;
});

const showWeather = (result) => {
  if (result.classList.contains('hidden')) result.classList.remove('hidden');
};
const setLocationData = (weatherData, weatherForecast) => {
  console.log(weatherData);
  locationName.textContent = weatherData.name;
  locationTemp.textContent = `${Math.round(weatherData.main.temp)}°`;
  locationFeelsLike.textContent = `Feels like ${weatherData.main.feels_like}°`;
  locationCloud.textContent = `${weatherData.clouds.all}%`;

  locationHumidity.textContent = `${weatherData.main.humidity}%`;
  locationWind.textContent = `${weatherData.wind.speed} m/s`;
  // locationWind.textContent = `${data.wind.speed * 10} km`;

  Today(weatherForecast, getDate(weatherData.sys.country));
  weatherIcon.src = Icons(
    weatherData.weather[0].main,
    weatherData.weather[0].description,
    getDate(weatherData.sys.country)
  );

  showWeather(weatherResult);
  // console.log(weatherResult.classList, 'SHOULD HAVE BEEN REMOVED');
  // searchError.textContent = '';
};

const getForecast = async (location, unit = 'metric') => {
  // if (location === '') {
  //   searchError.textContent = 'City not found 😔';
  // } else {
  //   this gets the data as a promise from the api
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
  );

  //   this transforms the promise into usable data
  const weatherData = await response.json();

  return weatherData;
  // }
};

const hideWeather = (result) => {
  if (!result.classList.contains('hidden')) result.classList.add('hidden');
};

const getWeather = async (location, unit = 'metric') => {
  if (location === '') {
    searchError.textContent = 'City not found 😔';
    hideWeather(weatherResult);
  } else {
    try {
      //   this gets the data as a promise from the api
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
      );

      //   this transforms the promise into usable data
      const weatherData = await response.json();
      const weatherForecast = await getForecast(location);
      setLocationData(weatherData, weatherForecast);
    } catch (err) {
      searchError.textContent = 'City not found 😔';
      hideWeather(weatherResult);
    }
  }
};

window.onload = () => {
  // getWeather('Angono');
  // getForecast('Taytay');
};

getWeatherButton.onclick = () => {
  getWeather(weatherLocation.value);
};

// get to display the data
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea

// trying to use the icon

// const getWeatherIcon = async (iconNumber) => {
//     `http://openweathermap.org/img/wn/${iconNumber}@2x.png`
// };

// console.log(clearDay);
// weatherIcon.src = clearDay;

// TODO: enable proper searching
// TODo: animation
