console.log('Client side JS file loaded');

const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#search');
let messageOne = document.querySelector('#messageOne');
let messageTwo = document.querySelector('#messageTwo');
 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherData(search.value);
});

const getWeatherData = (location) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const weatherApiUrl = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
    fetch(weatherApiUrl).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}