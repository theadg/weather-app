import { format } from 'date-fns';
import Icons from './icons';

const removeTodayForecast = (forecastBody) => {
  if (forecastBody.firstElementChild) {
    while (forecastBody.firstElementChild) {
      forecastBody.removeChild(forecastBody.firstElementChild);
    }
  }
};
const createTodayCard = (todayForecast) => {
  const forecastBody = document.querySelector('.forecast__body');

  removeTodayForecast(forecastBody);

  todayForecast.forEach((element, index) => {
    if (index >= 4) return;

    // append items here
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast__card');

    const forecastTemp = document.createElement('p');
    forecastTemp.classList.add('forecast__temp');

    forecastTemp.textContent = `${Math.round(element.main.temp)}°`;
    const forecastIcon = document.createElement('img');
    forecastIcon.classList.add('forecast__icon');

    forecastIcon.src = Icons(
      element.weather[0].main,
      element.weather[0].description,
      element.dt_txt,
      true
    );

    const forecastTime = document.createElement('p');
    forecastTime.classList.add('forecast__time');

    forecastTime.textContent = element.dt_txt.slice(-8, -3);

    forecastCard.append(forecastTemp, forecastIcon, forecastTime);
    forecastBody.append(forecastCard);
  });
};

export default function Today(forecast, currentDate) {
  // get first 4 forecasts, or depending kung yung date is equal to date today
  // console.log(forecast.list[0].dt_txt);

  // console.log(currentDate);
  // console.log(typeof forecast.list[0].dt_txt);
  // console.log(typeof currentDate);

  const formattedDate = format(new Date(currentDate), 'yyyy-MM-dd');
  const verifyDate = (currentValue) =>
    formattedDate === currentValue.dt_txt.slice(0, 10);

  const getTodayValues = (data) => {
    const todayValues = data.filter(verifyDate);
    return todayValues;
  };

  createTodayCard(getTodayValues(forecast.list));
}
