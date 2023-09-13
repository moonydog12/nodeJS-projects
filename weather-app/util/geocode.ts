import axios from 'axios'

type Config = {
  baseURL: string
  key: string
}

function geocode(address: string, callback: CallableFunction, { baseURL, key }: Config) {
  const url = `${baseURL}/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`
  axios
    .get(url)
    .then((response) => response.data)
    .then(({ features }) => {
      if (features.length === 0) {
        callback('Unable to find location, Try another search.', undefined)
      } else {
        const [longitude, latitude] = features[0].center
        const { place_name } = features[0]
        console.log(`Location: ${place_name}`)

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

export default geocode
