import EmptyDay from '../components/calendar/EmptyDay';
import { getAllDaysInMonth, getFirstDayIndex } from './timeFunctions';
export const fillCalendar = (month) => {
  //Create a 7x5 array
  const emptyFixedArr = new Array(42).fill(null).map(() => <EmptyDay />);
  const allDays = getAllDaysInMonth(month, 2022);
  const firstDay = getFirstDayIndex(month, 2022);

  // Fill Arrays with empty Days
  for (let i = firstDay, j = 0; i < allDays.length + firstDay; i++, j++) {
    emptyFixedArr[i] = <EmptyDay number={allDays[j].getDate()} />;
  }

  //Divide to match UI
  const week1 = emptyFixedArr.slice(0, 7);
  const week2 = emptyFixedArr.slice(7, 14);
  const week3 = emptyFixedArr.slice(14, 21);
  const week4 = emptyFixedArr.slice(21, 28);
  const week5 = emptyFixedArr.slice(28, 35);
  const week6 = emptyFixedArr.slice(35, 42);

  return { week1, week2, week3, week4, week5, week6 };
};
