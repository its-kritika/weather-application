const request = require('request')

//to provide security for my various api keys
require('dotenv').config()

const geocode = (( address, callback ) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+address+'&key='+process.env.API_KEY_GEOCODE+'&limit=1'

    request( {url , json: true}, (error, { body } = {}) => {
        if (error){
            callback('Unable to connect to location services! Check your Wifi Connection!🛜', undefined)
        }else if( body.results.length === 0 ){
            callback('Unable to find location!😞 Try searching another!!', undefined)
        }else{
            const result = body.results[0]
            callback( undefined, {
                latitude: result.geometry.lat,
                longitude: result.geometry.lng,
                location: result.formatted
            })
        }
    })
})

module.exports = geocode