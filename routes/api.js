var express = require('express');
var router = express.Router();

// File reader modules
var fs = require('fs');
var path = require('path');

// HTTPS modules
var https = require('https');

// Get geolocation of the machine
router.get('/geolocation', (req, res, next) => {

    // Hit json file on the web and send it
    // to the client requesting it
    https.get('https://ipinfo.io/json', (resp) => {

      let data = '';

      // Store chunk of data received
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // Parse response and send back
      resp.on('end', () => {
        res.json(JSON.parse(data.trim()));
      });

      // Catch error
      resp.on('error', (err) => {
        res.json({});
        console.log("Error: " + err.message);
      });

    });
  
});

// Get weather
router.get('/weather', (req, res, next) => {

      // API info required
      const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
      const key = '&appid=624a5719fc88bdf6359cecd6a3e7de74';
  
      console.log(req.query.city);
      
      // Make request to openweather with
      // requested city
      https.get(`${url}${req.query.city}${key}`, (resp) => {
  
        let data = '';
  
        // Store chunk of data received
        resp.on("data", (chunk) => {
          data += chunk;
        });
  
        // Parse response and send back
        resp.on('end', () => {
          res.json(JSON.parse(data.trim()));
        });
  
        // Catch error
        resp.on('error', (err) => {
          res.json({});
          console.log("Error: " + err.message);
        });
  
      });
    
});

// Get photo
router.get('/photo', (req, res, next) => {
  
        // API info required
        const url_first   = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ccc692bea7335112f0e94ce94676836';
        const ulr_second  = '&format=json&nojsoncallback=1&auth_token=72157666113847389-8e8886ebc2403c3b&api_sig=a5b773186f6fc2d80f212a10c7a105e4';

        console.log("Latitude: ", req.query.lat);
        console.log("Latitude: ", req.query.lon);

        // Make request to openweather with
        // requested city
        https.get(`${url_first}&lat=${req.query.lat}&lon=${req.query.lon}${ulr_second}`, (resp) => {
    
          let data = '';
    
          // Store chunk of data received
          resp.on("data", (chunk) => {
            data += chunk;
          });
    
          // Parse response and send back
          resp.on('end', () => {
            res.json(JSON.parse(data.trim()));
          });
    
          // Catch error
          resp.on('error', (err) => {
            res.json({});
            console.log("Error: " + err.message);
          });
    
        });
      
  });

module.exports = router;