import './styles/style.scss';
import clearDay from './assets/conditions/clearDay.png';
import Icons from './components/icons';
import Today from './components/today';
import Logo from './assets/Logo.svg';
import 'animate.css';

const ct = require('countries-and-timezones');

const logo = document.querySelector('#logo');
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
  new Promise((resolve) => {
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

const showWeather = () => {
  if (weatherResult.classList.contains('hidden'))
    weatherResult.classList.remove('hidden');
};

const hideWeather = () => {
  if (!weatherResult.classList.contains('hidden')) {
    if (searchState) {
      animateCSS('.weather__result', 'slideOutDownCustom');
      animateCSS('.container__head', 'slideOutDown');

      weatherResult.onanimationend = () => {
        weatherResult.classList.add('hidden');
        console.log('why are you running');
      };
    }
  }
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

  // showWeather(weatherResult);
  animateCSS('.weather__result', 'slideInUp');
  animateCSS('.container__head', 'slideInUp');
  showWeather();
};

const getForecast = async (location, unit = 'metric') => {
  //   this gets the data as a promise from the api
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
  );

  //   this transforms the promise into usable data
  const weatherData = await response.json();

  console.log(weatherData);
  return weatherData;
};

const getWeather = async (location, unit = 'metric') => {
  if (location === '') {
    searchError.textContent = 'City not found 😔';
    animateCSS('.container__head', 'headShake');
    // searchContainer.classList.add('animate__headShake');
    // console.log(searchContainer);
    hideWeather(weatherResult, '.weather__result');
    searchState = false;
  } else {
    try {
      searchState = true;

      //   this gets the data as a promise from the api
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea`
      );

      //   this transforms the promise into usable data
      const weatherData = await response.json();
      const weatherForecast = await getForecast(location);
      setLocationData(weatherData, weatherForecast);
      searchError.textContent = '';
    } catch (err) {
      searchError.textContent = 'City not found 😔';
      animateCSS('.container__head', 'headShake');
      searchState = false;
      hideWeather(weatherResult, '.weather__result');
    }
  }
};

window.onload = () => {
  animateCSS('.container__head', 'slideInDown');
  logo.src = Logo;
};

getWeatherButton.onclick = () => {
  getWeather(weatherLocation.value);
};

weatherLocation.onkeypress = (e) => {
  if (e.key === 'Enter') {
    getWeather(weatherLocation.value);
  }
};
