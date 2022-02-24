import { TextField, Typography, Button, Box, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../validations/validationSchemas';
import SaveIcon from '@mui/icons-material/Save';
import { createReminder } from '../../../api/calendarAPI/createReminder';
import { CalendarContext } from '../../../context/calendarContext';
import { useContext } from 'react';
import { styles } from '../styles';

export default function AddEventModal({ open, setOpen, day }) {
  const { setTriggerUpdate, reminderIds } = useContext(CalendarContext);

  const handleClose = () => setOpen(false);
  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    createReminder(day, data).then((res) => {
      setTriggerUpdate((prev) => !prev);
      handleClose();
      console.log('created Succesfully', res);
    });
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.box}>
          <Typography
            sx={{ fontWeight: '400', fontSize: '20px' }}
          >{`${day}/02 - Add Event`}</Typography>
          <Box sx={styles.modalText}>
            <TextField
              id={'title'}
              name={'title'}
              label={'Title'}
              required={true}
              fullWidth
              margin='dense'
              variant='standard'
              autoComplete='off'
              {...register('title')}
              error={errors['title'] ? true : false}
            />
            <Typography
              variant='inherit'
              color='error'
              style={{ textAlign: 'left' }}
            >
              {errors['title']?.message}
            </Typography>
          </Box>
          <Box sx={styles.modalText}>
            <TextField
              id='time'
              label='Time'
              name={'time'}
              variant='standard'
              type='time'
              defaultValue='07:30'
              {...register('time')}
              error={errors['time'] ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
            <Typography
              variant='inherit'
              color='error'
              style={{ textAlign: 'left' }}
            >
              {errors['time']?.message}
            </Typography>
          </Box>
          <Box sx={styles.modalText}>
            <TextField
              id={'city'}
              name={'city'}
              label={'City'}
              required={true}
              fullWidth
              margin='dense'
              variant='standard'
              autoComplete='off'
              {...register('city')}
              error={errors['city'] ? true : false}
            />
            <Typography
              variant='inherit'
              color='error'
              style={{ textAlign: 'left' }}
            >
              {errors['city']?.message}
            </Typography>
          </Box>
          <Box sx={styles.modalText}>
            <TextField
              id={'description'}
              name={'description'}
              label={'Description'}
              fullWidth
              margin='dense'
              variant='standard'
              autoComplete='off'
              {...register('description')}
              error={errors['description'] ? true : false}
            />
            <Typography
              variant='inherit'
              color='error'
              style={{ textAlign: 'left' }}
            >
              {errors['description']?.message}
            </Typography>
          </Box>
          <Box
            sx={{
              ...styles.modalText,
              paddingBottom: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                minWidth: '64px',
                '&hover': '',
              }}
              onClick={handleSubmit(onSubmit)}
              startIcon={<SaveIcon sx={{ width: '18px', heigth: '18px' }} />}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
