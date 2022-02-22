import { getFirstDayIndex } from './timeFunctions';
import Day from '../components/calendar/Day';
export const updateCalendar = (reminders, monthInformation, month) => {
  console.log(reminders);
  if (reminders) {
    const fullMonth = [
      ...monthInformation.week1,
      ...monthInformation.week2,
      ...monthInformation.week3,
      ...monthInformation.week4,
      ...monthInformation.week5,
    ];
    const firstDay = getFirstDayIndex(month, 2022);
    for (let i = firstDay, j = 0; i < reminders.length + firstDay; i++, j++) {
      fullMonth[i] = <Day number={j + 1} reminders={reminders[j].reminders} />;
    }

    const week1 = fullMonth.slice(0, 7);
    const week2 = fullMonth.slice(7, 14);
    const week3 = fullMonth.slice(14, 21);
    const week4 = fullMonth.slice(21, 28);
    const week5 = fullMonth.slice(28, 35);

    return { week1, week2, week3, week4, week5 };
  } else {
    return monthInformation;
  }
};
