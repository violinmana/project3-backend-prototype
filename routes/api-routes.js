const router = require('express').Router();
const passport = require('passport');
const Business = require('../db/business'); 

//api route to get all businesses with promotions by city
router.get('/:city', (req, res) => {
    Business.getAllInCity(req.params.city, res)
}); 

//route to get list of businesses
router.get('/business/list', (req, res) => {
    Business.getAll(res); 
}); 

router.post('/add', (req, res) => {
    Business.addBusiness(req.business, req, res); 
})


module.exports = router; 