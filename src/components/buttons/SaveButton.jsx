import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material'
import { memo } from 'react'
import { buttonStyles } from './buttonStyles'
function SaveButton({ handleSubmit }) {
    return (
        <div>
            <Button
                variant="contained"
                sx={buttonStyles.saveButton}
                onClick={handleSubmit}
                startIcon={<SaveIcon sx={buttonStyles.startIcon} />}
            >
                Save
            </Button>
        </div>
    )
}
export default memo(SaveButton)
