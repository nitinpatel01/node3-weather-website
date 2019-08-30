const path = require('path');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up static dir to serve
app.use(express.static(publicDirPath));

//Setup handlbar engine, views and partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// hbs.registerPartial(partialsPath);
var filenames = fs.readdirSync(partialsPath);
filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsPath + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});


// Default route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Nitin Patel'
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nitin Patel'
    });
});

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help topics',
        name: 'Nitin Patel'
    });
});

// Weather
app.get('/weather', (req, res) => {
    const address = req.query.address;

    if(!address) {
        return res.send({
            error: 'Pls provide address'
        });
    }

    geocode(address, (error, locationData) => {
        if(error) {
            return res.send({
                error
            });
        }
    
        forecast(locationData.longitude, locationData.latitude, (error, forecast) => {
            if(error) {
                return res.send({
                    error
                });
            }

            return res.send({
                forecastSummary: forecast.forecastSummary,
                temperatureHigh: forecast.temperatureHigh,
                temperatureLow: forecast.temperatureLow,
                location: locationData.location,
                address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nitin Patel',
        errorMessage: 'Help article not found'
    });
});

// Handle request for which route doesn't exist
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nitin Patel',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});