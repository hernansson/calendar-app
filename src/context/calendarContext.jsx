import { useMemo, useState, createContext, useEffect } from 'react';

import { getListRemindersURL } from '../api/calendarAPI/getListRemindersURL';
import { fillCalendar } from '../utils/fillCalendar';
import { updateCalendar } from '../utils/updateCalendar';
export const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthInfo, setMonthInfo] = useState(fillCalendar(month));
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [reminderIds, setRemindersIds] = useState();
  const getAllIds = (data) => {
    const ids = data.flatMap((rem) => rem.reminders).map((remi) => remi.id);
    const objtIds = ids.reduce(function (acc, cur, i) {
      acc[cur] = false;
      return acc;
    }, {});

    return objtIds;
  };
  useEffect(() => {
    setMonthInfo(fillCalendar(month)); //API I chose does not support more request. At least show them empty

    getListRemindersURL(month)
      .then((reminders) => {
        setRemindersIds(getAllIds(reminders));
        setMonthInfo(updateCalendar(reminders, monthInfo, month));
      })
      .catch((err) =>
        console.log(
          'API not yet implemented,UPGRADE PLAN (Sorry, I dont have any paid service :( )',
          err
        )
      );
  }, [month, triggerUpdate]);

  return (
    <CalendarContext.Provider
      value={{
        month,
        setMonth,
        monthInfo,
        setTriggerUpdate,
        reminderIds,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
