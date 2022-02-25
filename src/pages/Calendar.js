import { useContext } from 'react'
import { Stack, Box, Typography, IconButton } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { CalendarContext } from '../context/calendarContext'

import { getMonthName } from '../utils/timeFunctions'

function Calendar() {
    const { month, setMonth, monthInfo } = useContext(CalendarContext)

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box component="div">
                <Typography variant="h2" color="text.primary">
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
                            setMonth((prev) => prev - 1)
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
                    <Typography color="primary.contrastText" variant="h4">
                        {getMonthName(month)}
                    </Typography>

                    <IconButton
                        disabled={month === 12}
                        onClick={() => {
                            setMonth((prev) => prev + 1)
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

export default Calendar
