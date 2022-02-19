import { useContext, useMemo } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { themeContext } from '../context/themeContext';
import Day from '../components/calendar/Day';
import { getAllDaysInMonth, getFirstDayIndex } from '../utils/timeFunctions';
function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative

  const { theme, colorMode } = useContext(themeContext);
  const getMonth = useMemo(() => {
    const emptyFixedArr = new Array(35).fill(null).map(() => <Day />);
    const allDays = getAllDaysInMonth(2, 2022);
    const firstDay = getFirstDayIndex(2, 2022);
    console.log(allDays[10].getDate());
    let j = 0;
    for (let i = firstDay; i < allDays.length + firstDay; i++) {
      emptyFixedArr[i] = <Day number={allDays[j].getDate()} />;
      j++;
    }
    const week1 = emptyFixedArr.slice(0, 7);
    const week2 = emptyFixedArr.slice(7, 14);
    const week3 = emptyFixedArr.slice(14, 21);
    const week4 = emptyFixedArr.slice(21, 28);
    const week5 = emptyFixedArr.slice(28, 35);

    const month = { week1, week2, week3, week4, week5 };
    console.log(getFirstDayIndex(2, 2022));

    return month;
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box component={'div'}>
        <Typography variant='h2'>Calendar</Typography>
      </Box>
      <Box
        sx={{
          width: '80%',
          height: '80%',
          backgroundColor: 'primary.main',
          marginTop: '10px',
          padding: '20px',
        }}
      >
        <Stack>
          {Object.keys(getMonth).map((week) => (
            <Stack
              direction='row'
              spacing={0.5}
              justifyContent='center'
              mt={0.5}
            >
              {getMonth[week].map((day) => (
                <Stack spacing={2}>{day}</Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Calendar;
