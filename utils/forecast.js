request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/272774105c6a006e7521647060907093/" + latitude + "," + longitude + "?units=si"

    request({url, "json" : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to the wether service", undefined)
        }else if(body.error){
            callback("Unable to identify location", undefined)
        }else{
            callback(
                undefined,
                {
                    "summary" : body.daily.data[0].summary,
                    "temperature" : body.currently.temperature,
                    "precipProbability" : body.currently.precipProbability
                }
            )
        }
    })
}

module.exports = forecast