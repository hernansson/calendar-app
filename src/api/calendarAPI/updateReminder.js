import axios from 'axios'

export const updateReminder = async (reminderId, info) => {
    const { data } = await axios({
        url: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io/calendar/v1/year/1/month/1/reminder/${reminderId}`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: info,
    })
    return data
}
