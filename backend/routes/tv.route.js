
const express=require('express')
const{getSimilarTvs,getTrendingTv,getTvDetails,getTvsByCategory,getTvTrailers}=require('../controllers/search.controller.js')

const router = express.Router();
router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);
module.exports= router;