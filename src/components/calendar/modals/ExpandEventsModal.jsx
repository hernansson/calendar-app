import {
    Typography,
    IconButton,
    Box,
    Modal,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useEffect, useState, memo, useContext } from 'react'
import { CalendarContext } from '../../../context/calendarContext'
import CircularProgress from '@mui/material/CircularProgress'
import CloseButton from '../../buttons/CloseButton'
import { styles } from '../styles'
import { getRemindersByDay } from '../../../api/calendarAPI/getRemindersByDay'
import AddEventModal from './AddEventModal'
import DeleteButton from '../../buttons/DeleteButton'
import EditEventModal from './EditEventModal'

function ExpandEventsModal({ day }) {
    const { isModalReminderOpen, setIsModalReminderOpen } =
        useContext(CalendarContext)

    const handleModalEdit = (e) => {
        setIsModalReminderOpen({
            ...isModalReminderOpen,
            [e]: !isModalReminderOpen[e],
        })
    }
    const [reminders, setReminders] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

    const handleConfirmDelete = () => {
        setOpenConfirmDelete((prev) => !prev)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            setLoading(true)
            getRemindersByDay(day)
                .then((data) => setReminders(data.reminders))
                .catch((err) => setError(err))
                .finally(setLoading(false))
        }
    }, [open, day])

    if (error) {
        console.error(error) // Creating an error component would be ideal, but time.
    }
    if (loading) {
        return <CircularProgress />
    }
    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreHorizIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.box}>
                    <CloseButton handleClose={handleClose} />
                    <Box sx={{ paddingLeft: '32px' }}>
                        <Typography
                            color="text.primary"
                            sx={{ fontWeight: '400', fontSize: '20px' }}
                        >
                            {`${day}/02 - All Reminders`}
                        </Typography>
                    </Box>
                    <List>
                        {reminders?.map((remi) => (
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteButton
                                                id={remi.id}
                                                handleConfirm={
                                                    handleConfirmDelete
                                                }
                                                isOpen={openConfirmDelete}
                                                handleClose={
                                                    handleConfirmDelete
                                                }
                                                icon={<DeleteIcon />}
                                            />
                                        </IconButton>
                                    }
                                    key={remi.id}
                                >
                                    <ListItemButton
                                        onClick={() => handleModalEdit(remi.id)}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: '18px',
                                                color: 'text.primary',
                                            }}
                                            primary={remi.title}
                                            secondary={remi.time}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <EditEventModal
                                    data={remi}
                                    open={isModalReminderOpen[remi.id]}
                                    handleModalEdit={handleModalEdit}
                                />
                            </>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <AddEventModal day={day} minimalist />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
export default memo(ExpandEventsModal)
