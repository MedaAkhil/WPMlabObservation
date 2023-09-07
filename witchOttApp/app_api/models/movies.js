const mongoose = require('mongoose');

const movieCastSchema = new mongoose.Schema({
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

const movieCardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    posterImageUrl:String,  
    movieDescription:String,
    movieDescription:[String],
    releaseDate:{
        type:Date,
        default:Date.now,
    },
    
    cast:[movieCastSchema],
    reviews:[reviewSchema],
})
movieCardSchema.index({coords: '2dsphere'});

mongoose.model('Movies', movieCardSchema);