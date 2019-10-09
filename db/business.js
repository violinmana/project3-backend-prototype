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

const Business = {
    getAll: (req, res) => {
        let allBusinesses = knex('business').select('*'); 
        res.send(allBusinesses); 
    }, 
    getAllInCity: (req, res) => {
        knex('business').innerJoin('promotion', 'business.id', 'promotion.business_id')
            .where('city', req.city)
            .then(result => {
                let businesses = result.map(item => {
                    return {
                        name: item.name, 
                        address: `${item.address1} ${item.city} ${item.state}, ${item.zip}`, 
                        latitude: item.latitude, 
                        longitude: item.longitude,
                        promotion: `${item.name}, ${item.description}, ${item.qtypeople}`
                    }
                })
                console.log(businesses)
                res.send(businesses)
            })
            .catch(err => console.log(err)); 
    }, 
    addBusiness: (obj) => {

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
    }
         
}; 

module.exports = Business; 