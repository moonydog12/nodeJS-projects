import axios from 'axios';

type Config = {
  baseURL: string;
  key: string;
};

async function geocode(address: string, { baseURL, key }: Config) {
  const url = `${baseURL}/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;
  try {
    const response = await axios.get(url);
    const features = response.data.features[0];
    const [longitude, latitude] = features.center;
    const { place_name: location } = features;
    return {
      longitude,
      latitude,
      location,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default geocode;
