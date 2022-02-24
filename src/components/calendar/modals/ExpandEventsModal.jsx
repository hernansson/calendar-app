import {
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CalendarContext } from '../../../context/calendarContext';
import { useEffect, useState, cloneElement } from 'react';
import { styles } from '../styles';
import { getRemindersByDay } from '../../../api/calendarAPI/getRemindersByDay';
import AddEventModal from './AddEventModal';
import DeleteButton from '../DeleteButton';
const ExpandEventsModal = ({ day }) => {
  // const { setTriggerUpdate, reminderIds } = useContext(CalendarContext);
  const [reminders, setReminders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const handleConfirmDelete = () => {
    setOpenConfirmDelete((prev) => !prev);
  };
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ paddingLeft: '32px' }}>
            <Typography
              color='text.primary'
              sx={{ fontWeight: '400', fontSize: '20px' }}
            >{`${day}/02 - All Reminders`}</Typography>
          </Box>
          <List>
            {reminders?.map((remi) => (
              <ListItem
                secondaryAction={
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteButton
                      id={remi.id}
                      handleConfirm={handleConfirmDelete}
                      isOpen={openConfirmDelete}
                      handleClose={handleConfirmDelete}
                      icon={<DeleteIcon />}
                    />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: '18px' }}
                    primary={remi.title}
                    secondary={remi.time}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AddEventModal open={isOpenAdd} setOpen={setIsOpenAdd} day={day} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ExpandEventsModal;
