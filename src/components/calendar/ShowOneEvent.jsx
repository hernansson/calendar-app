import React, { memo, useContext } from 'react'
import { Box } from '@mui/material'
import { EditTypo } from '../styledComponents/EditTypo'
import AddEventModal from './modals/AddEventModal'
import EditEventModal from './modals/EditEventModal'

import { CalendarContext } from '../../context/calendarContext'

function ShowOneEvent({ reminder, day }) {
    const { isModalReminderOpen, setIsModalReminderOpen } =
        useContext(CalendarContext)

    const handleModalEdit = (e) => {
        setIsModalReminderOpen({
            ...isModalReminderOpen,
            [e]: !isModalReminderOpen[e],
        })
    }
    return (
        <Box
            sx={{
                height: '80%',
                paddingTop: '8px',
                paddingLeft: '8px',
            }}
        >
            <Box
                onClick={() => handleModalEdit(reminder.id)}
                sx={{ paddingBottom: '8px' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirecction: 'column',
                    }}
                >
                    <EditTypo noWrap sx={{ fontSize: '14px' }}>
                        {`${reminder.title}`}
                    </EditTypo>
                </Box>
                <Box>
                    <EditTypo
                        sx={{ fontSize: '14px' }}
                    >{`${reminder.time}`}</EditTypo>
                </Box>
            </Box>
            <AddEventModal day={day} />
            <EditEventModal
                data={reminder}
                open={isModalReminderOpen[reminder.id]}
                handleModalEdit={handleModalEdit}
            />
        </Box>
    )
}
export default memo(ShowOneEvent)
