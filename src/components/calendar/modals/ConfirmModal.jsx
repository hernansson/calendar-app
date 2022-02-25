import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    Box as MuiBox,
    Button,
    DialogActions,
    styled,
} from '@mui/material'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PropTypes from 'prop-types'

const Box = styled(MuiBox)({
    '& > *': {
        marginTop: 16,
    },
})

export default function Confirm({
    onClose,
    isOpen,
    title,
    message,
    loading,
    onConfirm,
    btnConfirmText,
    btnCancelText,
    confirmBtn: ConfirmButton,
    confirmBtnProps,
    error,
}) {
    return (
        <Dialog
            onClose={onClose}
            PaperProps={{ style: { width: 464, padding: 36 } }}
            open={isOpen}
        >
            <DialogTitle style={{ padding: 0 }} disableTypography>
                <Typography variant="h5">{title}</Typography>
            </DialogTitle>
            <DialogContent style={{ padding: 0, marginTop: 24 }}>
                <Box>
                    <MuiBox style={{ display: 'flex', gap: 16 }}>
                        <InfoOutlinedIcon
                            style={{
                                alignSelf: 'center',
                                fontSize: 32,
                                color: '#FF7A00',
                            }}
                        />
                        <Typography style={{ color: '#474747' }} variant="h4">
                            {message}
                        </Typography>
                    </MuiBox>
                </Box>
            </DialogContent>
            <DialogActions style={{ padding: 0, marginTop: 40 }}>
                <Button
                    disabled={loading}
                    style={{ width: 112 }}
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                >
                    {btnCancelText}
                </Button>
                <ConfirmButton
                    loading={loading}
                    error={error}
                    disabled={loading}
                    style={{ width: 112 }}
                    variant="contained"
                    color="primary"
                    onClick={onConfirm}
                    {...confirmBtnProps}
                    label={btnConfirmText}
                >
                    {btnConfirmText}
                </ConfirmButton>
            </DialogActions>
        </Dialog>
    )
}

Confirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    btnConfirmText: PropTypes.string,
    btnCancelText: PropTypes.string,
    confirmBtn: PropTypes.elementType,
    confirmBtnProps: PropTypes.object,
}

Confirm.defaultProps = {
    btnConfirmText: 'Okey',
    btnCancelText: 'Cancel',
    confirmBtn: Button,
}
