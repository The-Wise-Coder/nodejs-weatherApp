let fetchWeather = '/weather';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.icon i');
const tempElement = document.querySelector('.temp-value span');
const weatherInfo = document.querySelector('.cloud-info span');
const weatherLocation = document.querySelector('.location span');
const dateElement = document.querySelector('.date span');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const period = new Date().getHours();
let boolean = (period >= 20 || period <= 04);
let iClass;
let text;

dateElement.textContent = new Date().getDate() + ', ' + months[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  tempElement.textContent = 'Loading...';
  weatherInfo.textContent = '';
  weatherLocation.textContent = '';
  const locationApi = fetchWeather + '?address=' + search.value;
  fetch(locationApi).then(res => {
    res.json().then(data => {
      if (data.error) {
        tempElement.textContent = data.error;
        weatherInfo.textContent = '';
        weatherLocation.textContent = '';
      } else {
        if(boolean) {
          iClass = 'wi wi-night-';
        } else {
          iClass = 'wi wi-day-';
        }
        switch (data.description) {
          case 'clear sky':
            text = (boolean) ? 'clear' : 'sunny';
            weatherIcon.className = iClass + text;
            break;
          case 'few clouds':
            text = (boolean) ? 'alt-cloudy' : 'cloudy';
            weatherIcon.className = iClass + text;
            break;
          case 'scattered clouds':
            weatherIcon.className = 'wi wi-cloud';
            break;
          case 'broken clouds':
            weatherIcon.className = 'wi wi-cloudy';
            break;
          case 'shower rain':
            weatherIcon.className = 'wi wi-showers';
            break;
          case 'rain':
            text = (boolean) ? 'alt-showers' : 'showers';
            weatherIcon.className = iClass + text;
            break;
          case 'thunderstorm':
            text = (boolean) ? 'alt-thunderstorm' : 'thunderstorm';
            weatherIcon.className = iClass + text;
            break;
          case 'snow':
            text = (boolean) ? 'alt-snow' : 'snow';
            weatherIcon.className = iClass + text;
            break;
          case 'mist':
            weatherIcon.className = 'wi wi-dust';
            break;
          case 'fog':
            weatherIcon.className = iClass + 'fog';
            break;
          case 'drizzle':
            text = (boolean) ? 'alt-showers' : 'showers';
            weatherIcon.className = iClass + text;
            break;
          case 'haze':
            text = (boolean) ? 'alt-cloudy-windy' : 'haze';
            weatherIcon.className = iClass + text;
            break;
          case 'smoke':
            weatherIcon.className = 'wi wi-smoke';
            break;
          case 'dust':
            weatherIcon.className = 'wi wi-dust';
            break;
          default:
            text = (boolean) ? 'alt-cloudy' : 'cloudy';
            weatherIcon.className = iClass + text;
            break;
        }
        tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + 'C';
        weatherInfo.textContent = data.description.toUpperCase();
        weatherLocation.textContent = data.cityName;
      }
    })
  });
});