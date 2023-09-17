/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import geocode from './util/geocode';
import forecast from './util/forecast';

class App {
  private readonly app: express.Application;

  private readonly port: number;

  private weatherBaseURL: string;

  private weatherAPIKey: string;

  private geoBaseURL: string;

  private geoAPIKey: string;

  private address: string;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '8000', 10);

    // Load environment variables
    dotenv.config({ path: path.join(__dirname, '../.env') });
    this.weatherBaseURL = process.env.API_WEATHER_URL!;
    this.weatherAPIKey = process.env.API_WEATHER_KEY!;
    this.geoBaseURL = process.env.API_GEO_URL!;
    this.geoAPIKey = process.env.API_GEO_KEY!;
    this.address = '';

    // Set up middleware and routes
    this.configureExpress();
    this.configureRoutes();
  }

  private configureExpress() {
    // Define paths for express config
    const publicDirectoryPath = path.join(__dirname, '../public');
    const viewsPath = path.join(__dirname, '../templates/views');

    // Setup handlebars engine and views location
    this.app.set('view engine', 'ejs');
    this.app.set('views', viewsPath);

    // Serve static files from the public directory
    this.app.use(express.static(publicDirectoryPath));
  }

  private configureRoutes() {
    this.app.get('', (req, res) => {
      res.render('index', {
        title: 'Weather App',
        name: 'Moonydog12',
      });
    });

    this.app.get('/about', (req, res) => {
      res.render('about', {
        title: 'About',
        name: 'Moonydog12',
      });
    });

    this.app.get('/help', (req, res) => {
      res.render('help', {
        title: 'Help',
        name: 'Moonydog12',
      });
    });

    this.app.get('/weather', async (req, res) => {
      const { address } = req.query;
      this.address = address;

      if (!this.address || this.address === '') {
        res.status(400).json({
          error: 'You must provide an address!',
        });
        return;
      }

      try {
        const data = await geocode(this.address, {
          baseURL: this.geoBaseURL,
          key: this.geoAPIKey,
        });
        const { longitude, latitude, location } = data;
        const forecastMsg = await forecast(longitude, latitude, {
          baseURL: this.weatherBaseURL,
          key: this.weatherAPIKey,
        });

        res.send({
          location,
          forecast: forecastMsg,
          address: req.query.address,
        });
      } catch (error) {
        res.status(404).send('test');
      }
    });

    this.app.get('*', (req, res) => {
      res.render('error', {
        title: 404,
        name: 'Moonydog12',
        errorMessage: 'Page not found.',
      });
    });
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is up on port ${this.port}`);
    });
  }
}

const app = new App();
app.startServer();
