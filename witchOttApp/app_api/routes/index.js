const express = require('express');
const router = express.Router();
const ctrlMovies = require('../controllers/movies');
const ctrlReviews = require('../controllers/reviews');
// locations
router.route('/movies').get(ctrlMovies.locationsListByDistance).post(ctrlMovies.moviesCreate);
router.route('/movies/:movieid').get(ctrlMovies.moviesReadOne).put(ctrlMovies.moviesUpdateOne).delete(ctrlMovies.moviesDeleteOne);
// reviews
router.route('/movies/:movieid/reviews').post(ctrlReviews.reviewsCreate);
router.route('/movies/:movieid/reviews/:reviewid').get(ctrlReviews.reviewsReadOne).put(ctrlReviews.reviewsUpdateOne).delete(ctrlReviews.reviewsDeleteOne);
module.exports = router;