import { getDate } from '../index';
// import clearDay from '../assets/conditions/clearDay.png';

// const icon = require(`../assets/conditions/${time}${time}.png` )
export default function Icons(condition, description) {
  // filter here
  //   probably use switch case
  //   TODO: finalize conditions
  const time = 'Day';
  const fileName = 'tShowerLight';
  //   const icon = require('../assets/conditions/' + fileName + time + '.png');
  const icon = require(`../assets/conditions/${fileName}${time}.png`);

  const currentWeatherIcon = icon;
  return currentWeatherIcon;
}
