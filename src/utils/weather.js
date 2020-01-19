const request = require('request');
const geocode = require('./geocode.js');

const forecast = (position,callback) => {

    const weatherUrl =  `https://api.darksky.net/forecast/d90c6321ad8a4fdadaf35df62f9e7129/${position.lat},${position.lng}?units=si`;

    request({
        url: weatherUrl,
        json: true
    },(error,response)=>{
        if(error){
            callback('cant line to the newwork',undefined);
        }else if(response.body.error){
            callback(response.body.error,undefined);
        }else{
            let body = response.body
            let degree = body.currently.temperature
            let rainChance = body.currently.precipProbability
            callback(undefined,{
                    'temperature': degree,
                    'rain chance' : rainChance
            }
            )
        }
    })
}

module.exports = forecast