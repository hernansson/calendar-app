import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { memo } from 'react'

function CloseButton({ handleClose }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}

export default memo(CloseButton)
