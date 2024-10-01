
const express=require('express')
const  {getSearchHistory,removeItemFromSearchHistory,searchMovie,searchPerson,searchTv}=require('../controllers/search.controller.js')

const router = express.Router();
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);
module.exports= router;