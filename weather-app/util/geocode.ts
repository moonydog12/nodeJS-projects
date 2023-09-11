import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const API_GEO_URL = process.env.API_GEO_URL
const API_GEO_KEY = process.env.API_GEO_KEY

export default function geocode(address: string, callback: CallableFunction) {
  const url = `${API_GEO_URL}/${encodeURIComponent(
    address,
  )}.json?access_token=${API_GEO_KEY}&limit=1`
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      if (data.features.length === 0) {
        callback('Unable to find location, Try another search.', undefined)
      } else {
        const [longitude, latitude] = data.features[0].center
        const { place_name } = data.features[0]

        callback(undefined, {
          longitude,
          latitude,
          location: place_name,
        })
      }
    })
    .catch((error) => {
      callback(error, undefined)
    })
}
