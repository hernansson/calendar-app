import axios from 'axios';

export const getLocationCode = async (city) => {
  const formatCity = city.replace(' ', '+');
  const { data } = await axios({
    url: `https://www.metaweather.com/api/location/search/?query=${formatCity}`,

    method: 'GET',
  });

  return data;
};
