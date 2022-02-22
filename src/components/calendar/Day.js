import { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { updateReminder } from '../../api/calendarAPI/updateReminder';
import { styled } from '@mui/material/styles';
import AddEventModal from './AddEventModal';
export default function Day({ number, reminders }) {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen((prev) => !prev);
  };
  const mocked = {
    title: 'Running exercise',
    summary: 'Run',
    location: 'Buenos Aires',
    description: 'Go running for at least 1 hour ',
  };
  return (
    <>
      <Box>
        <StyledCard
          elevation={3}
          sx={{
            width: 128,
            height: 128,
          }}
        >
          <Box
            sx={{
              height: '25%',
              width: '20%',
              backgroundColor: 'warning.main',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '20px', color: 'primary.contrastText' }}
            >
              {number}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {reminders?.length > 0 ? (
              reminders.map((remi) => (
                <Box sx={{ display: 'flex', flexDirecction: 'row' }}>
                  <Typography>{remi.time}</Typography>
                  <Typography>{remi.title}</Typography>
                </Box>
              ))
            ) : (
              <AddEventTypo onClick={handleModal}>+ add event</AddEventTypo>
            )}
          </Box>
          <button onClick={() => updateReminder(reminders[0].id, mocked)}>
            Update Test
          </button>
        </StyledCard>
      </Box>
      <AddEventModal open={open} setOpen={setOpen} day={number} />
    </>
  );
}
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AddEventTypo = styled(Typography)`
  &:hover {
    color: #19d2bf;
    cursor: pointer;
  }
  &:focus {
    background-color: green;
  }
`;
