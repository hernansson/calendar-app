import { Typography, Button, IconButton, Box, Modal } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CalendarContext } from '../../../context/calendarContext';
import { useContext, useEffect, useState } from 'react';
import { styles } from '../styles';
import { getRemindersByDay } from '../../../api/calendarAPI/getRemindersByDay';
import { AddEventTypo } from '../../styledComponents/AddEventTypo';
export default function ExpandEventsModal({ day }) {
  // const { setTriggerUpdate, reminderIds } = useContext(CalendarContext);
  const [reminders, setReminders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      getRemindersByDay(day)
        .then((data) => setReminders(data.reminders))
        .catch((err) => setError(err))
        .finally(setLoading(false));
    }
  }, [open]);

  if (error) {
    console.error(error); // Creating an error component would be ideal, but time.
  }
  if (loading) {
    return 'Loading'; // Also loader component. (same for every request.)
  }
  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.box}>
          <Typography
            sx={{ fontWeight: '400', fontSize: '20px' }}
          >{`${day}/02 - Add Event`}</Typography>
          <AddEventTypo>+ add event</AddEventTypo>
          <Button variant='contained' onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
