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
    getAll: (req, res) => {
        let allBusinesses = knex('business').select('*'); 
        res.send(allBusinesses); 
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
                cb.send(businesses); 
            })
            .catch(err => console.log(err)); 
    }, 
    addBusiness: (obj, cb) => {
        knex('business')
            .insert({
                name: name, 
                address1: address1, 
                city: city, 
                state: state, 
                zip: zip, 
                latitude: latitude, 
                longitude: longitude,
                abclicense: abc, 
            })
            .then((result) => {
                cb.send(result); 
            })
            .catch(err => console.log(err)); 
    }
         
}; 

module.exports = Business; 