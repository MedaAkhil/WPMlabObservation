const mongoose = require('mongoose');
const WebSeries = mongoose.model('WebSeries');



const webSeriesList = async (req, res) => {
    try {
      const wsresults = await WebSeries.find();
      
      
      const webseries = wsresults.map(result => ({
        _id: result._id,
        title: result.title,
        posterImageUrl: result.posterImageUrl,
        webSeriesDescription: result.webSeriesDescription,
        releaseDate: result.releaseDate,
        cast:{
          title:result.title,
          heroName:result.heroName,
          heroImageUrl:result.heroImageUrl,
          heroinname:result.heroinname,
          heroinImageUrl:result.heroinImageUrl,
          director:result.director,
          directorImageUrl:result.directorImageUrl,
        },
        reveiws:{
          title:result.title,
          rating:result.rating,
          reviewText:result.reviewText,
          createdOn:result.createdOn,
        }
      }));
      // console.log(result.reviewText);
      res.status(200).json(webseries);
      // console.log(result.reviewText)
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching movies.' });
    }
  };




  const webSeriesReadOne = async (req, res) => {
    try {
      const movie = await WebSeries.findById(req.params.webseriesid).exec();
      if (!movie) {
        return res.status(404).json({"message": "movie not found"});
      }
      return res.status(200).json(movie);
    } catch (err) {
      return res.status(404).json(err);
    }
  };


  
  const webSeriesCreate = (req, res) => {
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

  
  
  const webSeriesUpdateOne = (req, res) => {
    const movieId = req.params.movieid;
  
    if (!movieId) {
      return res
        .status(400) 
        .json({ "message": "movieid is required" });
    }
  
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
      { new: true }, 
      (err, updatedMovie) => {
        if (err) {
          return res
            .status(500) 
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
  
  
  const webSeriesDeleteOne = (req, res) => {
    const movieId = req.params.movieid;
  
    if (!movieId) {
      return res
        .status(400) 
        .json({ "message": "movieid is required" });
    }
  
    Movies.findByIdAndRemove(movieId, (err, deletedMovie) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }
      if (!deletedMovie) {
        return res
          .status(404)
          .json({ "message": "movieid not found" });
      }
  
      res
        .status(204) 
        .json(null);
    });
  };
  


module.exports = {
  webSeriesList,
  webSeriesCreate,
  webSeriesDeleteOne,
  webSeriesReadOne,
  webSeriesUpdateOne
};