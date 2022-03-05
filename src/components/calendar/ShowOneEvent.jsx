import React, { memo, useContext } from 'react'
import { Box } from '@mui/material'
import { EditTypo } from '../styledComponents/EditTypo'
import AddEventModal from './modals/AddEventModal'
import EditEventModal from './modals/EditEventModal'
import { styles } from './styles'
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
        <Box sx={styles.showOneEventBox}>
            <Box
                onClick={() => handleModalEdit(reminder.id)}
                sx={styles.paddingBottom}
            >
                <Box sx={styles.columnLine}>
                    <EditTypo noWrap sx={styles.editTypo}>
                        {`${reminder.title}`}
                    </EditTypo>
                </Box>
                <Box>
                    <EditTypo
                        sx={styles.editTypo}
                    >{`${reminder.time}`}</EditTypo>
                </Box>
            </Box>
            <AddEventModal day={day} />
            <EditEventModal
                info={reminder}
                open={isModalReminderOpen[reminder.id]}
                handleModalEdit={handleModalEdit}
            />
        </Box>
    )
}
export default memo(ShowOneEvent)
