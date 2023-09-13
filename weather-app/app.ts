import dotenv from 'dotenv'
import geocode from './util/geocode'
import forecast from './util/forecast'

dotenv.config({ path: '../.env' })

const forecastConfig = {
  baseURL: process.env.API_WEATHER_URL!,
  key: process.env.API_WEATHER_KEY!,
}

const geoConfig = {
  baseURL: process.env.API_GEO_URL!,
  key: process.env.API_GEO_KEY!,
}

// get the CLI input
const location = process.argv[2]

if (!location) {
  console.log('Please provide cli input')
  process.exit()
}

geocode(
  location,
  (error: any, data: any) => {
    if (error) {
      return console.log(error)
    }

    // callback chaining
    forecast(data.longitude, data.latitude, forecastConfig)
  },
  geoConfig,
)
