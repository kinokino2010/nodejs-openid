var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/timeline', function(req, res) {
  res.render('timeline', { title: 'Time Line' });
});

module.exports = router;
