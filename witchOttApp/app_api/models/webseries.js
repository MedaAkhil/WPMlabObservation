const mongoose = require('mongoose');

const webSeriesCastSchema = new mongoose.Schema({
    title:String,
    heroName:{
        type:String,
        required:true
    },
    heroImageUrl:String,
    heroinname:{
        type:String,
        required:true,
    },
    heroinImageUrl:String,
    director:String,
    directorImageUrl:String,
    
    
})
const reviewSchema = new mongoose.Schema({
    title: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {type: Date, default: Date.now}
});

const webSeriesCardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    posterImageUrl:String,  
    webSeriesDescription:String,
    releaseDate:{
        type:Date,
        default:Date.now,
    },
    
    cast:[webSeriesCastSchema],
    reviews:[reviewSchema],
})

mongoose.model('WebSeries', webSeriesCardSchema);