const axios = require("axios");

const URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 3;
const WeatherAPIKey = process.env.WEATHER_API_KEY;

async function fetchForecast(location) {
  try {
    const response = await axios({
      url: URL,
      method: "get",
      params: {
        q: location,
        days: FORECAST_DAYS,
        key: WeatherAPIKey,
      },
      responseType: "json",
    });
    const city = response.data.location.name;
    const region = response.data.location.region;
    const country = response.data.location.country;
    const locationName = `${city}, ${region}, ${country}`;
    const weatherData = response.data.forecast.forecastday.map(
      (forecastDay) => {
        return {
          date: forecastDay.date,
          temperatureMinC: forecastDay.day.mintemp_c,
          temperatureMaxC: forecastDay.day.maxtemp_c,
          temperatureMinF: forecastDay.day.mintemp_f,
          temperatureMaxF: forecastDay.day.maxtemp_f,
          sunriseTime: forecastDay.astro.sunrise,
          sunsetTime: forecastDay.astro.sunset,
          moonriseTime: forecastDay.astro.moonrise,
          moonsetTime: forecastDay.astro.moonset,
        };
      },
    );
    return {
      locationName,
      weatherData,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching data for ${location}`);
  }
}

module.exports = { fetchForecast };
