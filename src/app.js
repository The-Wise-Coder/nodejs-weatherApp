const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const weatherData = require('../utils/weatherData');

const app = express();

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  
  if(!address) {
    res.send({
      error: 'You must have to enter city name in the search bar'
    });
  }
  
  weatherData(address, (error, {temperature, description, cityName} = {}) => {
    if(error) {
      return res.send({error});
    }
    res.send({
      temperature,
      description,
      cityName
    })
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oops! Page not found...'
  });
});

app.listen(port, () => {
  console.log('Server is up and running on port:' + port);
});