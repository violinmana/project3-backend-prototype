const knex = require('./knex/knex'); 
const __ = require('lodash'); 
const dotenv = require('dotenv');
dotenv.config();

//node geocoder package to convert address to lat/long
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

//business model 
const Business = {
    //gets all businesses
    getAll: () => {
        return knex('business').select()
    }, 
    //gets all businesses in city with promotions
    getAllInCity: (city, cb) => {
        //knex join on promotion where city = the city 
        knex('promotion').leftJoin('business', 'promotion.business_id', 'business.id')
            .where('city', city)
            .then(result => {
                console.log(result);
                //map through result to make array of objects for markers 
                let promotions = result.map(item => {
                    return {
                        promotion: [`${item.promotion_name}`, `${item.qtypeople}`, `${item.description}`],
                        name: item.business_name,
                        address: `${item.address1} ${item.address2} ${item.city} ${item.state}, ${item.zip}`,
                        latitude: item.latitude,
                        longitude: item.longitude
                    }
                })
                console.log(promotions); 
                cb.json(promotions); 
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