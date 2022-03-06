import { Box, Typography } from '@mui/material'
import AddEventModal from './modals/AddEventModal'
import { StyledCard } from '../styledComponents/StyledCard'
import ExpandEventsModal from './modals/ExpandEventsModal'
import { getDayString } from '../../utils/getDayString'
import ShowOneEvent from './ShowOneEvent'
import ShowTwoEvents from './ShowTwoEvents'
import '@fontsource/roboto/500.css'
import { memo } from 'react'
import { styles } from './styles'

const Day = ({ number, reminders, month }) => {
    return (
        <>
            {number ? (
                <Box>
                    <StyledCard elevation={2} sx={styles.card}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={styles.dayNumberBox}>
                                <Typography sx={styles.dayNumber}>
                                    {number}
                                </Typography>
                            </Box>
                            <Box sx={styles.letterDayBox}>
                                <Typography sx={styles.letterDay}>
                                    {number && getDayString(number, month)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={styles.reminderBox}>
                            {reminders?.length > 0 ? (
                                reminders.length === 1 ? (
                                    <ShowOneEvent
                                        reminder={reminders[0]}
                                        day={number}
                                    />
                                ) : (
                                    <>
                                        <Box sx={styles.twoEventsBox}>
                                            <ShowTwoEvents
                                                reminderOne={reminders[0]}
                                                reminderTwo={reminders[1]}
                                            />
                                        </Box>
                                        <Box sx={styles.expandDots}>
                                            <ExpandEventsModal day={number} />
                                        </Box>
                                    </>
                                )
                            ) : (
                                <Box sx={styles.noEventBox}>
                                    <Box sx={{ paddingBottom: '16px' }}>
                                        <AddEventModal day={number} />
                                    </Box>
                                    <Box>
                                        <AddEventModal day={number} />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </StyledCard>
                </Box>
            ) : (
                <Box>
                    <StyledCard elevation={2} sx={styles.noCard} />
                </Box>
            )}
        </>
    )
}

export default memo(Day)
