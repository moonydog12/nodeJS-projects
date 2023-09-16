const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const locationEl = document.querySelector('.location');
const forecastEl = document.querySelector('.forecast');

// Fetch weather
async function fetchWeather(location) {
  try {
    const response = await fetch(`http://localhost:8000/weather?address=${location}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchInput.value;
  locationEl.textContent = 'Loading';
  forecastEl.textContent = '';
  fetchWeather(location)
    .then((data) => {
      const { location: locationMsg, forecast } = data;
      locationEl.textContent = locationMsg;
      forecastEl.textContent = forecast;
    })
    .catch((error) => {
      locationEl.textContent = error.message;
    });
});
