import axios from 'axios';

export const getWeather = async (cityCode) => {
  const { data } = await axios({
    url: `http://www.metaweather.com/api/location/${cityCode}`,
    method: 'GET',
  });

  return data;
};
