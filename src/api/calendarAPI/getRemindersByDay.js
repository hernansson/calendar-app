import axios from 'axios'

export const getRemindersByDay = async (day) => {
    const { data } = await axios({
        url: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io/calendar/v1/year/1/month/${day}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    })

    return data
}
