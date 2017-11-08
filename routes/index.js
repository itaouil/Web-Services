var express = require('express');
var router = express.Router();

// Serves webpage
router.get('/', (req, res, next) => {
  res.render('weather');
});

module.exports = router;
