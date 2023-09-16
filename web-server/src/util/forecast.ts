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
    const {
      temperature,
      feelslike: feelsLike,
      weather_descriptions: weatherDescription,
    } = currentData;
    return `${weatherDescription[0]},It's currently ${temperature} degrees out. It feels like ${feelsLike} degrees out`;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default forecast;
