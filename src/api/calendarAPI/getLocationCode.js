import axios from 'axios'

export const getLocationCode = async (city) => {
    const formatCity = city.replace(' ', '+')
    const { data } = await axios({
        url: `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=${formatCity}`,
        mode: 'cors',
        method: 'GET',
    })

    return data
}
