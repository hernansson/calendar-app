import { useContext, useEffect, useMemo, useState } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import { CalendarContext } from '../context/calendarContext';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { getMonthName } from '../utils/timeFunctions';

function Calendar(props) {
  const { month, setMonth, monthInfo, loadingContext } =
    useContext(CalendarContext);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box component={'div'}>
          <Typography variant='h2' color={'text.primary'}>
            Calendar 2022
          </Typography>
        </Box>
        <Box
          sx={{
            width: '1000px',
            backgroundColor: 'primary.main',
            marginTop: '10px',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              disabled={month === 1}
              onClick={() => {
                setMonth((prev) => prev - 1);
              }}
            >
              <ArrowCircleLeftIcon
                sx={{
                  height: '50px',
                  width: '50px',
                  color: 'primary.contrastText',
                  visibility: month === 1 ? 'hidden' : 'visible',
                }}
              />
            </IconButton>
            <Typography color='primary.contrastText' variant='h4'>
              {getMonthName(month)}
            </Typography>

            <IconButton
              disabled={month === 12}
              onClick={() => {
                setMonth((prev) => prev + 1);
              }}
            >
              <ArrowCircleRightIcon
                sx={{
                  height: '50px',
                  width: '50px',
                  color: 'primary.contrastText',
                  visibility: month === 12 ? 'hidden' : 'visible',
                }}
              />
            </IconButton>
          </Box>

          <Stack>
            {Object.keys(monthInfo).map((week) => (
              <Stack direction='row' justifyContent='center'>
                {monthInfo[week].map((day) => (
                  <Stack sx={{ padding: '2px' }}>{day}</Stack>
                ))}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
