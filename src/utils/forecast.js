const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f10854248b0df6a62bc08218cc399c72/' + latitude + ',' + longitude;

    const options = {
        url,
        json: true,
        rejectUnauthorized: false
    };

    request (options, (error, {body}) => {
        if (error) {
            callback ('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback ('Unable to get weather forecast. Try again later. ', undefined);
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const temperatureHigh = 'Highest temperature of the day is going to be around ' + body.daily.data[0].temperatureHigh + ' degrees.';
            const temperatureLow = 'Lowest temperature of the day is going to be around ' + body.daily.data[0].temperatureLow + ' degrees.';
            const forecastSummary = summary + ' It is currently ' + temperature + ' degress out. There is a ' + precipProbability + '% chance of rain.';
            const forecast = {
                forecastSummary,
                temperatureHigh,
                temperatureLow
            };
            callback (undefined, forecast);
        }
    });
};

module.exports = forecast;