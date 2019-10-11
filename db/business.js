const knex = require('./knex/knex'); 
const __ = require('lodash'); 

//node geocoder package to convert address to lat/long
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCClN1022_IiEU-pj6XSuSYddtQl7vEpOA', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

//business model 
const Business = {
    //gets all businesses
    getAll: (cb) => {
        knex('business').select('*') 
        .then((result) => {
            cb.json(result); 
        })
    }, 
    //gets all businesses in city with promotions
    getAllInCity: (city, cb) => {
        //knex join on promotion where city = the city 
        knex('business').innerJoin('promotion', 'business.id', 'promotion.business_id')
            .where('city', city)
            .then(result => {
                //map through result to make object for markers 
                let businesses = result.map(item => {
                    return {
                        name: item.business_name, 
                        address: `${item.address1} ${item.city} ${item.state}, ${item.zip}`, 
                        latitude: item.latitude, 
                        longitude: item.longitude,
                        promotion: `${item.promotion_name}, ${item.description}, ${item.qtypeople}`
                    }
                })
                console.log(businesses); 
                cb.json(businesses); 
            })
            .catch(err => console.log(err)); 
    }, 
    addBusiness: (obj, req, cb) => {
        knex('business')
            .insert({
                name: obj.name, 
                address1: obj.address1, 
                city: obj.city, 
                state: obj.state, 
                zip: obj.zip, 
                latitude: obj.latitude, 
                longitude: obj.longitude,
                abclicense: obj.abc, 
                user_id: req.user.id
            })
            .then((result) => {
                cb.send(result); 
            })
            .catch(err => console.log(err)); 
    }
}; 

module.exports = Business; 