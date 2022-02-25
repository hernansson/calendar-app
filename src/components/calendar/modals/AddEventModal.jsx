import { Box, Modal, IconButton } from '@mui/material'
import { memo, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { styles } from '../styles'
import { AddEventTypo } from '../../styledComponents/AddEventTypo'
import CloseButton from '../../buttons/CloseButton'
import CreateForm from '../CreateForm'
function AddEventModal({ day, minimalist }) {
    const [open, setOpen] = useState(false)
    const handleModal = () => setOpen((prev) => !prev)

    // I'll use async await, just show . but Its always better to choose one.

    return (
        <div>
            {minimalist ? (
                <IconButton onClick={handleModal}>
                    <AddCircleIcon
                        sx={{ color: 'primary.main' }}
                        style={{ fontSize: 36 }}
                    />
                </IconButton>
            ) : (
                <AddEventTypo
                    color="text.primary"
                    sx={{ opacity: '55%' }}
                    onClick={handleModal}
                >
                    + Event
                </AddEventTypo>
            )}

            <Modal open={open} onClose={handleModal}>
                <Box sx={styles.box}>
                    <CloseButton handleClose={handleModal} />
                    <CreateForm day={day} />
                </Box>
            </Modal>
        </div>
    )
}
export default memo(AddEventModal)
