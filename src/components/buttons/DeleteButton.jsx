import { IconButton, Box } from '@mui/material'
import { memo, useContext, useState } from 'react'
import Confirm from '../calendar/modals/ConfirmModal'
import ButtonDialog from '../calendar/modals/ButtonDialog'
import { deleteReminder } from '../../api/calendarAPI/deleteReminder'
import { CalendarContext } from '../../context/calendarContext'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function DeleteButton({ handleConfirm, isOpen, id, handleClose }) {
    const { setTriggerUpdate } = useContext(CalendarContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleDelete = () => {
        try {
            setLoading(true)
            deleteReminder(id)
            setTriggerUpdate((prev) => !prev)
            setLoading(false)
        } catch {
            setError(true)
        }
    }

    // Another way of implementing.

    if (error) {
        console.error(error) // Creating an error component would be ideal, but time.
    }
    if (loading) {
        return 'Loading' // Also loader component. (same for every request.)
    }

    // or may be use a useFetch.
    return (
        <Box>
            <IconButton onClick={handleConfirm}>
                <DeleteForeverIcon />
            </IconButton>
            <Confirm
                onClose={handleConfirm}
                error={error}
                isOpen={isOpen}
                title="Are you Sure?"
                message="This is going to delete your reminder permanently"
                loading={loading}
                onConfirm={handleDelete}
                btnConfirmText="Yes"
                btnCancelText="No"
                confirmBtn={ButtonDialog}
                confirmBtnProps={{
                    dialogProps: {
                        loadingMsg: 'Deleting reminder...',
                        successMsg: 'Reminder Updated!',
                        errorMsg: 'Error Deleting...',
                    },
                    variant: 'contained',
                    color: 'primary',
                    size: 'medium',
                    label: 'Delete',
                    onClose: handleClose,
                }}
            />
        </Box>
    )
}
export default memo(DeleteButton)
