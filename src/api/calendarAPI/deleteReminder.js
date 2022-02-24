import axios from 'axios';
export const deleteReminder = async (reminderId) => {
  const { data } = await axios({
    url: `https://${process.env.REACT_APP_MOCKAPI_KEY}.mockapi.io/calendar/v1/year/1/month/1/reminder/${reminderId}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  });
  return data;
};
