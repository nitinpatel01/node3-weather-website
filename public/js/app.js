console.log('Client side JS file loaded');

const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#search');
let forecastSummary = document.querySelector('#forecastSummary');
let forecastLocation = document.querySelector('#forecastLocation');
let temperatureHigh = document.querySelector('#temperatureHigh');
let temperatureLow = document.querySelector('#temperatureLow');
 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherData(search.value);
});

const getWeatherData = (location) => {
    forecastLocation.textContent = 'Loading...';
    errorMessage.textContent = '';
    const weatherApiUrl = '/weather?address=' + encodeURIComponent(location);
    fetch(weatherApiUrl).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorMessage.textContent = data.error;
                forecastLocation.textContent = '';
                forecastSummary.textContent = '';
                temperatureHigh.textContent = '';
                temperatureLow.textContent = '';
            } else {
                forecastLocation.textContent = data.location;
                forecastSummary.textContent = data.forecastSummary;
                temperatureHigh.textContent = data.temperatureHigh;
                temperatureLow.textContent = data.temperatureLow;
            }
        });
    });
}