const request = require('request')

//to provide security for my various api keys
require('dotenv').config()

const forecast = ( (lat, long, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&appid='+process.env.API_KEY_FORECAST+'&units=metric'

    request( {url , json: true}, (error, { body }) => {
        if (error){
            callback('Unable to provide the weather service!', undefined)
        }else if( body.message){
            callback('Unable to find location', undefined)
        }else{
            // const string = body.weather[0].description + '. It is currently '+body.main.temp+ ' degrees out but feels like '+ body.main.feels_like+' degrees.'

            const foreCastObj = {
                weather : body.weather[0].description,
                temp : body.main.temp,
                feel : body.main.feels_like,
                humid : body.main.humidity
            }
            callback(undefined, foreCastObj)
        }
    })
})

module.exports = forecast