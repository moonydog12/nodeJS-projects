import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import hbs from 'hbs';
import geocode from './util/geocode';
import forecast from './util/forecast';

const app = express();
const port = 8000;
dotenv.config({ path: path.join(__dirname, '../.env') });

// Define paths for express config in EJS module
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Moonydog12',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Moonydog12',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Moonydog12',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address!',
    });
    return;
  }

  try {
    const data = await geocode(req.query.address, {
      baseURL: process.env.API_GEO_URL,
      key: process.env.API_GEO_KEY,
    });
    const { longitude, latitude, location } = data;
    const forecastMsg = await forecast(longitude, latitude, {
      baseURL: process.env.API_WEATHER_URL,
      key: process.env.API_WEATHER_KEY,
    });

    res.send({
      location,
      forecast: forecastMsg,
      address: req.query.address,
    });
  } catch (error) {
    console.log(error);
    res.send({
      error,
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term',
    });
    return;
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 404,
    name: 'Moonydog12',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 404,
    name: 'Moonydog12',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
