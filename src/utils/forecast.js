const request = require('request')

const forecast = ( (lat, long, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&appid=e7f5a83b2ef2d8ea44a7b563233690a6&units=metric'

    request( {url , json: true}, (error, { body }) => {
        if (error){
            callback('Unable to provide the weather service!', undefined)
        }else if( body.message){
            callback('Unable to find location', undefined)
        }else{
            const string = body.weather[0].description + '. It is currently '+body.main.temp+ ' degrees out but feels like '+ body.main.feels_like+' degrees.'
            callback(undefined, string)
        }
    })
})

module.exports = forecast