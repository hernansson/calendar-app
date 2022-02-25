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

const Box = styled(MuiBox)({ '& > *': { marginTop: 16 } })

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
            PaperProps={{ style: { width: 400, padding: 24 } }}
            open={isOpen}
        >
            <DialogTitle
                style={{
                    padding: '16px',
                    justifyContent: 'center',
                    display: 'flex',
                }}
                disableTypography
            >
                <Typography color="text.primary" variant="h5">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent style={{ padding: 0, marginTop: 0 }}>
                <Box>
                    <MuiBox
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <InfoOutlinedIcon
                            style={{
                                alignSelf: 'center',
                                fontSize: 48,
                                color: '#FF7A00',
                                marginRight: '8px',
                            }}
                        />
                        <Typography color="text.primary" variant="h6">
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
