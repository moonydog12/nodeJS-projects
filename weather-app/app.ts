import axios from 'axios'
import dotenv from 'dotenv'
import geocode from './util/geocode'

dotenv.config()
const API_WEATHER_URL = process.env.API_WEATHER_URL
const API_WEATHER_KEY = process.env.API_WEATHER_KEY
const API_GEO_URL = process.env.API_GEO_URL
const API_GEO_KEY = process.env.API_GEO_KEY

async function fetchWeather() {
  try {
    const response = await axios.get(
      `${API_WEATHER_URL}?access_key=${API_WEATHER_KEY}&query=37.8267,-122.4233&units=f`,
      {},
    )
    const currentData = response.data.current
    const { temperature, feelslike, weather_descriptions } = currentData
    console.log(
      `${weather_descriptions[0]},It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out`,
    )
  } catch (error: any) {
    console.log(error)
  }
}

async function fetchGeocoding() {
  try {
    const response = await axios.get(
      `${API_GEO_URL}/taiwan.json?access_token=${API_GEO_KEY}&limit=1`,
    )
    const data = response.data
    const [longitude, latitude] = data.features[0].center
    console.log(longitude, latitude)
  } catch (error: any) {
    console.log(error)
  }
}

geocode('taiwan', (error: any, data: any) => {
  console.log(error)
  console.log(data)
})
