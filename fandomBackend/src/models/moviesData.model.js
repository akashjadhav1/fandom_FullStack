const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema( {
    adult: { type: Boolean, required: true },
    backdrop_path: { type: String, required: true },
    genre_ids:[], 
    id: { type: Number, required: true, unique: true },
    original_language: { type: String, required: true },
    original_title: { type: String},
    media_type: { type: String, required: true },
    overview: { type: String, required: true },
    popularity: { type: Number, required: true },
    poster_path: { type: String, required: true },
    release_date: { type: Date, required: true },
    title: { type: String, required: true },
    video: { type:String, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true }
},
{
    timestamps: true, 
    versionKey: false
})



const TrendingData = mongoose.model("TrendingData", moviesSchema);

module.exports = TrendingData;