import axios from 'axios'

export const createReminder = async (day, info) => {
    const { data } = await axios({
        url: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io/calendar/v1/year/1/month/${day}/reminder`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: info,
    })
    return data
}
