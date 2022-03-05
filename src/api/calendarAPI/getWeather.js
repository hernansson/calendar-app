import axios from 'axios'
//using proxy to bypass CORS - just for testing purposes, not intended for prod
export const getWeather = async (cityCode) => {
    const { data } = await axios({
        url: `https://api.allorigins.win/raw?url=http://www.metaweather.com/api/location/${cityCode}`,
        method: 'GET',
        mode: 'cors',
    })

    return data
}
