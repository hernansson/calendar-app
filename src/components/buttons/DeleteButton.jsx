import Confirm from '../calendar/modals/ConfirmModal';
import ButtonDialog from '../calendar/modals/ButtonDialog';
import { Button } from '@mui/material';
import { deleteReminder } from '../../api/calendarAPI/deleteReminder';
import { useContext, useState } from 'react';
import { CalendarContext } from '../../context/calendarContext';
export default function DeleteButton({
  handleConfirm,
  isOpen,
  id,
  handleClose,
  icon,
}) {
  const { setTriggerUpdate } = useContext(CalendarContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    deleteReminder(id)
      .then(() => setTriggerUpdate((prev) => !prev))
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(setLoading(false));
  };
  //Another way of implementing.

  /*  if (error) {
      console.error(error); // Creating an error component would be ideal, but time.
    }
    if (loading) {
      return 'Loading'; // Also loader component. (same for every request.)
    }*/

  // or may be use a useFetch.
  return (
    <div style={{ marginRight: '8px' }}>
      <Button
        variant='text'
        sx={{
          color: 'text.primary',
          minWidth: '64px',
          '&hover': '',
        }}
        onClick={handleConfirm}
        startIcon={icon}
      ></Button>
      <Confirm
        onClose={handleClose}
        error={error}
        isOpen={isOpen}
        title={'Are you Sure?'}
        message={'This is going to delete your reminder permanently'}
        loading={loading}
        onConfirm={handleDelete}
        btnConfirmText='Yes'
        btnCancelText='No'
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
      ></Confirm>
    </div>
  );
}
