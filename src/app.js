const path = require('path');
const express = require('express');
const hbs = require('hbs'); 

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

app.get('/help/asdf/asd/*', (req, res) =>{
    res.render("pageNotFound", {title: "404", message: "Help Page Not Found"});
});

app.get('/*', (req, res) =>{
    res.render("pageNotFound", {title: "404", message: "Page Not Found"});
});

app.listen(3000, () => {
    console.log('Its aliiiiiiiive!!!');
});