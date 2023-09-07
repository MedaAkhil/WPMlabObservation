const mongoose = require('mongoose');
const Loc = mongoose.model('Movies');

const locationsListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
    limit: 10
  };
  if (!lng || !lat) {
    return res
      .status(404)
      .json({ "message": "lng and lat query parameters are required" });
  }

  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      }
    ]);
    const movies = results.map(result => {
      return {
        _id: result._id,
        title: result.title,
        posterImageUrl: result.posterImageUrl,
        movieDescription: result.movieDescription,
        movieDescription: result.movieDescription,
        releaseDate: `${result.distance.calculated.toFixed()}m`
      }
    });
    res
      .status(200)
      .json(movies);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};

const moviesCreate = (req, res) => {
  Loc.create({
    title: req.body.title,
    posterImageUrl: req.body.posterImageUrl,
    movieDescription: req.body.movieDescription,
    genere: req.body.genere.split(","),
    // facilities.split(","),
    cast: {
        title: req.body.title,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
    }
  },
  (err, movie) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(movie);
    }
  });
};

const moviesReadOne = (req, res) => {
    Loc
      .findById(req.params.movieid)
      .exec((err, movie) => {
        if (!movie) {
          return res
            .status(404)
            .json({"message": "movie not found"});
        } else if (err) {
          return res
            .status(404)
            .json(err);
        } else {
          return res
            .status(200)
            .json(movie);
        }
      });
};

const moviesUpdateOne = (req, res) => {
  if (!req.params.movieid) {
    return res
      .status(404)
      .json({
        "message": "Not found, movieid is required"
      });
  }
  Loc
    .findById(req.params.movieid)
    .select('-reviews -rating')
    .exec((err, movie) => {
      if (!movie) {
        return res
          .status(404)
          .json({
            "message": "movieid not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      movie.title= req.body.title,
      movie.posterImageUrl = req.body.posterImageUrl,
      movie.movieDescription = req.body.movieDescription,
      movie.genere = req.body.genere.split(","),
      movie.cast = {
        title: req.body.title,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
      };
      movie.save((err, loc) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(loc);
        }
      });
    }
  );
};

const moviesDeleteOne = (req, res) => {
  const {movieid} = req.params;
  if (movieid) {
    Loc
      .findByIdAndRemove(movieid)
      .exec((err, movie) => {
          if (err) {
            return res
              .status(404)
              .json(err);
          }
          res
            .status(204)
            .json(null);
        }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "No Movie"
      });
  }
};

module.exports = {
  locationsListByDistance,
  moviesCreate,
  moviesReadOne,
  moviesUpdateOne,
  moviesDeleteOne
};