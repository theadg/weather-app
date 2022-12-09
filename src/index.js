import './styles/style.scss';

const weatherLocation = document.querySelector('#weatherLocation');
const getWeatherButton = document.querySelector('#getWeather');
const weatherIcon = document.querySelector('#weatherIcon');
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
  weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  console.log(weatherData);
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

getWeatherButton.onclick = () => {
  // add get weather function here
  getWeather(weatherLocation.value);
  //   console.log(weatherLocation.value);
};

window.onload = () => getForecast(weatherLocation.value);

// get to display the data
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=5cefd4fab8a0f1d0f39eb7f546ef57ea

// trying to use the icon

// const getWeatherIcon = async (iconNumber) => {
//     `http://openweathermap.org/img/wn/${iconNumber}@2x.png`
// };
