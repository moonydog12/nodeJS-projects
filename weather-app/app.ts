import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

async function fetchWeather() {
  try {
    const response = await axios.get(
      `${API_URL}?access_key=${API_KEY}&query=37.8267,-122.4233&units=f`,
      {},
    )
    const currentData = response.data.current
    console.log(currentData)
    const { temperature, feelslike, weather_descriptions } = currentData
    console.log(
      `${weather_descriptions[0]},It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out`,
    )
  } catch (error) {
    console.log(error)
  }
}

// fetchWeather()
