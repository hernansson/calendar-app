import React, { memo, useContext } from 'react'
import { Box } from '@mui/material'
import { EditTypo } from '../styledComponents/EditTypo'
import EditEventModal from './modals/EditEventModal'
import { styles } from './styles'
import { CalendarContext } from '../../context/calendarContext'

// Maybe More than 2, if we update the UI - we coudl just pass reminders in general and map it.
function ShowTwoEvents({ reminderOne, reminderTwo }) {
    const { isModalReminderOpen, setIsModalReminderOpen } =
        useContext(CalendarContext)

    const handleModalEdit = (e) => {
        setIsModalReminderOpen({
            ...isModalReminderOpen,
            [e]: !isModalReminderOpen[e],
        })
    }
    return (
        <>
            <Box
                onClick={() => handleModalEdit(reminderOne.id)}
                sx={styles.paddingBottom}
            >
                <Box sx={styles.columnLine}>
                    <EditTypo noWrap sx={styles.editTypo}>
                        {`${reminderOne.title}`}
                    </EditTypo>
                </Box>
                <Box>
                    <EditTypo
                        sx={styles.editTypo}
                    >{`${reminderOne.time}`}</EditTypo>
                </Box>
            </Box>

            <EditEventModal
                info={reminderOne}
                open={isModalReminderOpen[reminderOne.id]}
                handleModalEdit={handleModalEdit}
            />

            <Box
                onClick={() => handleModalEdit(reminderTwo.id)}
                sx={{ paddingBottom: '8px' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirecction: 'column',
                    }}
                >
                    <EditTypo noWrap sx={{ fontSize: '14px' }}>
                        {`${reminderTwo.title}`}
                    </EditTypo>
                </Box>
                <Box>
                    <EditTypo
                        sx={{ fontSize: '14px' }}
                    >{`${reminderTwo.time}`}</EditTypo>
                </Box>
            </Box>

            <EditEventModal
                info={reminderTwo}
                open={isModalReminderOpen[reminderTwo.id]}
                handleModalEdit={handleModalEdit}
            />
        </>
    )
}

export default memo(ShowTwoEvents)
