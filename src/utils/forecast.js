const request = require('request')

const forecast = (lat, long, callB) =>{
    
    const url = 'https://api.darksky.net/forecast/5997d70a4f5f5214ea0b453532c5fb88/'+ lat +',' + long;
    request({url, json: true}, (err, {body}) => {
        
        const {code, error, latitude, longitude, daily, currently} = body;
        const {temperature, precipProbability} = currently;
        const {summary} = daily;
        if(err){
          callB('Unable to connect to location services!', undefined)
        } else if(code === 400){
            callB(error, undefined)
        } else {
         /*  console.log(res.body.latitude);
          console.log(res.body.longtitude);
          console.log(res.body.currently.summary); */
          c_temp = (temperature - 32 ) * 5/9;
          callB(undefined, summary + ' It is currently ' + Math.floor(c_temp) + '° degress out. There is a ' + precipProbability + '% chance of rain.') 
          //callB(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;