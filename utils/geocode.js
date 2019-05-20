const request = require("request")

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1Ijoia2lhcmFyaXAiLCJhIjoiY2p2bXZ1eTU0MG96ZDQ4bGV4cXFtZjZhbiJ9.WizDSeU70jd3uwHykViQHA&limit=1"
    
    request({url, "json" : true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        }else if(body.error){
            callback("Unable to get location", undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports =  geocode