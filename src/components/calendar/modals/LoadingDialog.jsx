import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles({
  actions: {
    marginTop: '32px',
    justifyContent: 'space-around',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  box: {
    '& > * + *': {
      marginLeft: 8,
    },
  },
  title: {
    alignSelf: 'center',
  },
});

const switchContent = {
  loading: (
    <CircularProgress
      size={174}
      style={{ alignSelf: 'center' }}
      color='primary'
    />
  ),
  success: (
    <CheckCircleIcon
      style={{ fontSize: 174, alignSelf: 'center' }}
      color='primary'
    />
  ),
  error: (
    <ErrorIcon style={{ fontSize: 174, alignSelf: 'center' }} color='error' />
  ),
};

export default function LoadingDialog({
  loadingMsg,
  successMsg,
  errorMsg,
  state,
  isOpen,
  onClose,
  onTryAgain,
  onCancel,
  onSuccess,
  successButtonText,
  errorButtonText,
  children,
}) {
  const classes = useStyles();

  const switchButtons = {
    loading: onCancel && (
      <Button
        variant='contained'
        color='secondary'
        disableElevation
        onClick={onCancel}
      >
        {'Cancel'}
      </Button>
    ),
    success: [
      <Button
        variant='contained'
        color={onSuccess ? 'secondary' : 'primary'}
        disableElevation
        onClick={onClose}
        key={1}
      >
        {'Close'}
      </Button>,
      onSuccess && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={onSuccess}
        >
          {successButtonText}
        </Button>
      ),
    ],
    error: [
      <Button
        key='CancelError'
        variant='contained'
        color='secondary'
        disableElevation
        onClick={onClose}
      >
        {'Cancel'}
      </Button>,
    ],
  };

  const titles = {
    loading: loadingMsg,
    success: successMsg,
    error: errorMsg,
  };

  const handleClose = () => state !== 'loading' && onClose();

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant='h5'> {titles[state]} </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {switchContent[state]}
        {state !== 'loading' && children}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Box className={classes.box}>{switchButtons[state]}</Box>
      </DialogActions>
    </Dialog>
  );
}

LoadingDialog.propTypes = {
  loadingMsg: PropTypes.string,
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string,
  state: PropTypes.oneOf(['loading', 'success', 'error']),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  successButtonText: PropTypes.string,
  errorButtonText: PropTypes.string,
};

LoadingDialog.defaultProps = {
  loadingMsg: 'Loading...',
  successMsg: 'Success!',
  errorMsg: 'Error!',
};
