
const express =require('express')
const {getMovieDetails,getMoviesByCategory,getMovieTrailers,getSimilarMovies,getTrendingMovie}=require('../controllers/movie.controller.js')

const router = express.Router();
router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
module.exports= router;