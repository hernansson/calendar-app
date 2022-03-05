import { memo, useContext } from 'react'
import { Stack, Box, Typography, IconButton } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { CalendarContext } from '../context/calendarContext'
import { pageStyle } from './pageStyles'
import { getMonthName } from '../utils/timeFunctions'

function Calendar() {
    const { month, setMonth, monthInfo } = useContext(CalendarContext)
    const leftArrow = {
        ...pageStyle.calendar.arrows,
        visibility: month === 1 ? 'hidden' : 'visible',
    }
    const rightArrow = {
        ...pageStyle.calendar.arrows,
        visibility: month === 12 ? 'hidden' : 'visible',
    }
    return (
        <Box sx={pageStyle.calendar.main}>
            <Box component="div">
                <Typography variant="h2" color="text.primary">
                    Calendar 2022
                </Typography>
            </Box>
            <Box sx={pageStyle.calendar.calendarBox}>
                <Box sx={pageStyle.calendar.calendarheader}>
                    <IconButton
                        disabled={month === 1}
                        onClick={() => {
                            setMonth((prev) => prev - 1)
                        }}
                    >
                        <ArrowCircleLeftIcon sx={leftArrow} />
                    </IconButton>
                    <Typography color="primary.contrastText" variant="h4">
                        {getMonthName(month)}
                    </Typography>

                    <IconButton
                        disabled={month === 12}
                        onClick={() => {
                            setMonth((prev) => prev + 1)
                        }}
                    >
                        <ArrowCircleRightIcon sx={rightArrow} />
                    </IconButton>
                </Box>

                <Stack>
                    {Object.keys(monthInfo).map((week, idx) => (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            key={idx}
                        >
                            {monthInfo[week].map((day, idx) => (
                                <Stack sx={{ padding: '2px' }} key={idx}>
                                    {day}
                                </Stack>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}

export default memo(Calendar)
