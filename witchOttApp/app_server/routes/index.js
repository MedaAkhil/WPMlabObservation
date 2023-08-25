var express = require('express');
var router = express.Router();
const home = require('../controllers/index')
/* GET home page. */
router.get('/', home.homePageRouter);
router.get('/movies', home.moviePageRouter);
router.get('/webseries', home.webSeriesPage);

module.exports = router;
