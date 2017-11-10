const express = require('express');
const router = express.Router();

// File reader modules
const fs = require('fs');
const path = require('path');

// HTTP/S modules
const https = require('https');
const http = require('http');

// Get geolocation of the machine
router.get('/geolocation', (req, res, next) => {

    // Hit json file on the web and send it
    // to the client (that requested it)
    https.get('https://ipinfo.io/json', (resp) => {

        let data = '';

        // Store chunk of data received
        resp.on("data", (chunk) => {
            data += chunk;
        });

        // Parse response and send back
        resp.on('end', () => {
            console.log(data);
            res.json(JSON.parse(data.trim()));
        });

        // Catch error
        resp.on('error', (err) => {
            res.json('{}');
            console.log("Error: " + err.message);
        });

    });

});

// Autocomplete
router.get('/suggestions', (req, res, next) => {

    // Get world capitals
    http.get(`http://country.io/capital.json`, (resp) => {

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
            res.json('{}');
            console.log("Error: " + err.message);
        });

    });

});

// Get weather
router.get('/weather', (req, res, next) => {

    // API info required
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const key = '&appid=624a5719fc88bdf6359cecd6a3e7de74&units=metric';

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
            res.json('{}');
            console.log("Error: " + err.message);
        });

    });

});

// Get photo
router.get('/photo', (req, res, next) => {

    // API info required
    const url_first   = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=467f7c6b4681b11f763ebd084c0606c2';
    const ulr_second  = '&format=json&nojsoncallback=1';

    // Make request to openweather for city input
    https.get(`${url_first}&tags=${req.query.tag}${ulr_second}`, (resp) => {

        let data = '';

        // Store chunk of data received
        resp.on("data", (chunk) => {
            data += chunk;
        });

        // Parse response and send back
        resp.on('end', () => {
            // console.log(data);
            res.json(JSON.parse(data.trim()));
        });

        // Catch error
        resp.on('error', (err) => {
            res.json('{}');
            console.log("Error: " + err.message);
        });

    });

});

module.exports = router;
