import express from 'express';
import path from 'path';
import hbs from 'hbs';

const app = express();
const port = 8000;

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

app.get('/weather', (req, res) => {
  res.send({
    location: 'Taiwan',
    forecast: 'It is raining',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
