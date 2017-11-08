var express = require('express');
var router = express.Router();

// File reader modules
var fs = require('fs');
var path = require("path");

// Sends back list of cities as a JSON
router.get('/cities', (req, res, next) => {

  // Read json file in data folder (city.list.json)
  fs.readFile(path.join(__dirname, '..', 'data', 'city.list.json'), 'utf8', (err, data) => {

    if (err) {
      return console.log("Error while reading json file: " + err);
    }

    res.json(JSON.parse(data));

  });

});

module.exports = router;