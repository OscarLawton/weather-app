const request = require('request')

const forecast = (lat, long, callB) =>{
    
    const url = 'https://api.darksky.net/forecast/5997d70a4f5f5214ea0b453532c5fb88/'+ lat +',' + long;
    request({url, json: true}, (err, {body}) => {
        
        const {code, error, latitude, longitude, daily, currently} = body;
        const {temperature, precipProbability} = currently;
        const {summary, data} = daily;
        
        if(err){
          callB('Unable to connect to location services!', undefined)
        } else if(code === 400){
            callB(error, undefined)
        } else {
         /*  console.log(res.body.latitude);
          console.log(res.body.longtitude);
          console.log(res.body.currently.summary); */
          console.log(data[0])
          c_temp = f_to_c(temperature);
          callB(undefined, summary + ' It is currently ' + c_temp + '° degress out. There is a ' + precipProbability + '% chance of rain. The maxium temprature is ' + f_to_c(data[1].temperatureMax) + ', the minium temprature ' + f_to_c(data[1].temperatureMin) + '.') 
          //callB(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

const f_to_c = (temp) =>{
  return Math.floor((temp - 32 ) * 5/9);
}
module.exports = forecast;