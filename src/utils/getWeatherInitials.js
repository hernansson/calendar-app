import { getLocationCode } from '../api/calendarAPI/getLocationCode';
import { getWeather } from '../api/calendarAPI/getWeather';

// The best way would be to filter by time, and day... just filter some parameters from 'weather'
// Also by using Google location API Autocomplete I could guarantee that city is valid, and so get a always a weather.
export const getWeatherInitials = async (city) => {
  const woeId = await getLocationCode(city);
  if (woeId.length > 0) {
    const weather = await getWeather(woeId[0].woeid);
    return weather ? weather.consolidated_weather[0].weather_state_abbr : null;
  } else {
    return null;
  }
};
