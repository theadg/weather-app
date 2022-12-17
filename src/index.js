import './styles/style.scss';
import clearDay from './assets/conditions/clearDay.png';
import Icons from './components/icons';
import Today from './components/today';
import 'animate.css';

const ct = require('countries-and-timezones');

const searchContainer = document.querySelector('.search__container');
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

let searchState = false;

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    console.log(node);

    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

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
  animateCSS('.weather__result', 'slideInUp');
  animateCSS('.search__container', 'slideInUp');
};

const getForecast = async (location, unit = 'metric') => {
  //   this gets the data as a promise from the api
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
  );

  //   this transforms the promise into usable data
  const weatherData = await response.json();

  return weatherData;
};

const hideWeather = (result, elementName) => {
  if (!result.classList.contains('hidden')) {
    if (searchState) {
      console.log(searchState);
      animateCSS('.search__container', 'slideOutDown');
      animateCSS('.weather__result', 'slideOutDownCustom');

      weatherResult.onanimationend = () => {
        weatherResult.classList.add('hidden');
      };
    } else {
      result.classList.add('hidden');
    }
  }
};

const getWeather = async (location, unit = 'metric') => {
  if (location === '') {
    searchError.textContent = 'City not found 😔';
    animateCSS('.search__container', 'headShake');
    // searchContainer.classList.add('animate__headShake');
    // console.log(searchContainer);
    hideWeather(weatherResult, '.weather__result');
    searchState = false;
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
      searchError.textContent = '';
      searchState = true;
    } catch (err) {
      searchError.textContent = 'City not found 😔';
      animateCSS('.search__container', 'headShake');
      searchState = false;
      hideWeather(weatherResult, '.weather__result');
    }
  }
};

window.onload = () => {
  animateCSS('.search__container', 'slideInDown');
};

getWeatherButton.onclick = () => {
  getWeather(weatherLocation.value);
};
