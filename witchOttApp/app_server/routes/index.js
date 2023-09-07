var express = require('express');
var router = express.Router();
const home = require('../controllers/index')
/* GET home page. */
router.get('/', home.homePage);
router.get('/movies/:movieid', home.moviePage);
router.get('/webseries/:webseriesid', home.webSeriesPage);
router.get('/movie/:movieid/review/new').get(home.addReview).post(home.doAddReview);

module.exports = router;