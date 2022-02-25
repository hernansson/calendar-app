import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import LoadingDialog from './LoadingDialog'

export default function ButtonDialog({
    label,
    onClick,
    onClose,
    dialogProps,
    loading,
    error,
    ...rest
}) {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
        onClose()
    }

    const handleCancel = () => {
        handleClose()
    }

    const handleClick = () => {
        setOpen(true)

        onClick && onClick()
    }

    const state = loading ? 'loading' : error ? 'error' : 'success'

    return (
        <>
            <Button {...rest} onClick={handleClick}>
                {label}
            </Button>
            <LoadingDialog
                {...dialogProps}
                state={state}
                onClose={handleClose}
                isOpen={open}
                onCancel={handleCancel}
            />
        </>
    )
}

ButtonDialog.propTypes = {
    options: PropTypes.object,
    label: PropTypes.string,
    onClick: PropTypes.func,
    dialogProps: PropTypes.shape({ LoadingDialog }.propTypes),
}
