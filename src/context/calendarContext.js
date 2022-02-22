import { useMemo, useState, createContext, useEffect } from 'react';
import { getAllDaysInMonth, getFirstDayIndex } from '../utils/timeFunctions';
import { getListRemindersURL } from '../api/calendarAPI/getListRemindersURL';
import { fillCalendar } from '../utils/fillCalendar';
import { updateCalendar } from '../utils/updateCalendar';
export const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthInfo, setMonthInfo] = useState(fillCalendar(month));

  useEffect(() => {
    setMonthInfo(fillCalendar(month));
    getListRemindersURL(month)
      .then((reminders) => {
        console.log(reminders);
        setMonthInfo(updateCalendar(reminders, monthInfo, month));
      })
      .catch(() =>
        console.log(
          'API not yet implemented,UPGRADE PLAN (Sorry, I dont have any paid service :( )'
        )
      );
  }, [month]);

  return (
    <CalendarContext.Provider value={{ month, setMonth, monthInfo }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
