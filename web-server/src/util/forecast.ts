import axios from 'axios';

type Config = {
  baseURL: string;
  key: string;
};

async function forecast(latitude: number, longitude: number, config: Config) {
  const { baseURL, key } = config;
  try {
    const response = await axios.get(
      `${baseURL}?access_key=${key}&query=${longitude},${latitude}&units=m`,
    );
    const currentData = response.data.current;
    const { temperature, feelslike: feelsLike, weather_descriptions, location } = currentData;
    return `${weather_descriptions[0]},It's currently ${temperature} degrees out. It feels like ${feelsLike} degrees out`;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

export default forecast;
