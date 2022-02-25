import axios from 'axios'

// Moack APi does not support year -> month -> day -> reminders (only resources), unless we upgrade
// Other API are limited to a few request per month
// MoackAPI lets me update and change the reminders... so I prefer to use this.
export const getListRemindersURL = async (month) => {
    if (month === 2) {
        const { data } = await axios({
url: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io/calendar/v1/year/1/month`,
            method: 'GET',
            headers: {'content-type': 'application/json',},
})

        return data
    }
    throw console.error('No API Support pot other months')
}
