var express = require('express');
var router = express.Router();

// Serves webpage
router.get('/', (req, res, next) => {
  res.render('weather');
});

// Autocomplete typing
router.get('/api/autocomplete', (req, res, next) => {
  
});

module.exports = router;
