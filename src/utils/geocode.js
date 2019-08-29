const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml0aW5wYXRlbDAxIiwiYSI6ImNqenNoeXFrNjAyY3YzbW54ejV6cWt6azMifQ.u7XG8ZtdMPT_bGsf48g2bA&limit=1';
    const options = {
        url,
        json: true,
        rejectUnauthorized: false
    };
    
    request(options, (error, {body}) => {
        if(error) {
            callback(error, undefined);
        } else if(body.error || body.features.length === 0) {
            callback('Unable to find location. Try again later.', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            });
        }
    });
};

module.exports = geocode;