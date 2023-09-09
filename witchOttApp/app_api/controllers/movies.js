const mongoose = require('mongoose');
const Movies = mongoose.model('Movies');

const moviesList = async (req, res) => {
  // const lng = parseFloat(req.query.lng);
  // const lat = parseFloat(req.query.lat);
  // const near = {
  //   type: "Point",
  //   coordinates: [lng, lat]
  // };
  // const geoOptions = {
  //   distanceField: "distance.calculated",
  //   key: 'coords',
  //   spherical: true,
  //   maxDistance: 20000,
  //   limit: 10
  // };
  // if (!lng || !lat) {
  //   return res
  //     .status(404)
  //     .json({ "message": "lng and lat query parameters are required" });
  // }

  try {
    const results = await Movies.aggregate([
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
        releaseDate: result.releaseDate
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
  Movies.create({
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

// const moviesReadOne = (req, res) => {
//   Movies.findById(req.params.movieid)
//   .exec((err, movie) => {
//     if (!movie) {
//       return res
//         .status(404)
//         .json({"message": "movie not found"});
//     } else if (err) {
//       return res
//         .status(404)
//         .json(err);
//     } else {
//       return res
//         .status(200)
//         .json(movie);
//     }
//   });
// };
const moviesReadOne = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.movieid).exec();
    if (!movie) {
      return res.status(404).json({"message": "movie not found"});
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(404).json(err);
  }
};


const moviesUpdateOne = (req, res) => {
  const movieId = req.params.movieid;

  // Check if movieid is provided
  if (!movieId) {
    return res
      .status(400) // Changed to 400 Bad Request
      .json({ "message": "movieid is required" });
  }

  // Use findByIdAndUpdate to simplify the code
  Movies.findByIdAndUpdate(
    movieId,
    {
      $set: {
        title: req.body.title,
        posterImageUrl: req.body.posterImageUrl,
        movieDescription: req.body.movieDescription,
        genere: req.body.genere.split(","),
        cast: {
          title: req.body.title,
          rating: req.body.rating,
          reviewText: req.body.reviewText,
        },
      },
    },
    { new: true }, // Return the updated document
    (err, updatedMovie) => {
      if (err) {
        return res
          .status(500) // Changed to 500 Internal Server Error
          .json(err);
      }
      if (!updatedMovie) {
        return res
          .status(404)
          .json({ "message": "movieid not found" });
      }

      res
        .status(200)
        .json(updatedMovie);
    }
  );
};


const moviesDeleteOne = (req, res) => {
  const movieId = req.params.movieid;

  // Check if movieid is provided
  if (!movieId) {
    return res
      .status(400) // Changed to 400 Bad Request
      .json({ "message": "movieid is required" });
  }

  // Use findByIdAndRemove to simplify the code
  Movies.findByIdAndRemove(movieId, (err, deletedMovie) => {
    if (err) {
      return res
        .status(500) // Changed to 500 Internal Server Error
        .json(err);
    }
    if (!deletedMovie) {
      return res
        .status(404)
        .json({ "message": "movieid not found" });
    }

    res
      .status(204) // Changed to 204 No Content
      .json(null);
  });
};


module.exports = {
  moviesList,
  moviesCreate,
  moviesReadOne,
  moviesUpdateOne,
  moviesDeleteOne
};