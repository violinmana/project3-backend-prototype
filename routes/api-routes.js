const router = require('express').Router();
const passport = require('passport');
const Business = require('../db/business'); 

//api route to get all businesses with promotions by city
router.get('/:city', (req, res) => {
    Business.getAllInCity(req.params.city, res)
}); 




module.exports = router; 