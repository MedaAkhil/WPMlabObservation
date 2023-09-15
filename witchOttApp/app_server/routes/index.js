var express = require('express');
var router = express.Router();
const home = require('../controllers/index')
/* GET home page. */
router.get('/', home.homePage);
router.get('/movies', home.moviesPage);
router.get('/movie/:movieid', home.moviePage);
router.get('/webseries', home.webSeriesPage);
router.get('/webseries/:webseriesid', home.onewebSeriesPage);
router.get('/movie/:movieid/review/new').get(home.addReview).post(home.doAddReview);

module.exports = router;