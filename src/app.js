const path = require('path');
const express = require('express');
const hbs = require('hbs'); 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths fore Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {title: "Weather"})
});

app.get('/about', (req, res) => {
    res.render('about', {title: "About"})
});

app.get('/help', (req, res) => {
    res.render('help', {title: "Help"});
});

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({error: "You must enter an address!"});
    }
    const location = req.query.address;
    geocode(location, (err, {latitude, longitude, place_name} = {}) => {
    
    
        if(err){
          return res.send({err})
        }
      
        forecast(latitude,longitude,(err, forecastData) =>{
          if(err){
            return res.send({err});
          }
          /* console.log (place_name);
          console.log('data', forecastData); */
          res.send({forecast: forecastData, location: place_name, address: req.query.address});
        });
    });  
    
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error: "You must provide a search term"});
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) =>{
    res.render("pageNotFound", {title: "404", message: "Help Page Not Found"});
});

app.get('/*', (req, res) =>{
    res.render("pageNotFound", {title: "404", message: "Page Not Found"});
});

app.listen(3000, () => {
    console.log('Its aliiiiiiiive!!!');
});