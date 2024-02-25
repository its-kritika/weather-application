const request = require('request')

const geocode = (( address, callback ) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=cba2b2e49f144b88a357137b737a0568&limit=1'

    request( {url , json: true}, (error, { body } = {}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
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