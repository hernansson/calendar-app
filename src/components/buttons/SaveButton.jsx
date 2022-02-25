import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material'
import { memo } from 'react'

function SaveButton({ handleSubmit }) {
    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    minWidth: '64px',
                    '&hover': '',
                }}
                onClick={handleSubmit}
                startIcon={<SaveIcon sx={{ width: '18px', heigth: '18px' }} />}
            >
                Save
            </Button>
        </div>
    )
}
export default memo(SaveButton)
