import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { memo } from 'react'
import { buttonStyles } from './buttonStyles'

function CloseButton({ handleClose }) {
    return (
        <Box sx={buttonStyles.closeButton}>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}

export default memo(CloseButton)
