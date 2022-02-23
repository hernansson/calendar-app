import { TextField, Typography, Button, Box, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchemas';
import SaveIcon from '@mui/icons-material/Save';
import { updateReminder } from '../../api/calendarAPI/updateReminder';
import { CalendarContext } from '../../context/calendarContext';
import { useContext } from 'react';
import { styles } from './styles';

export default function EditEventModal({ open, handleModalEdit, data }) {
  const { setTriggerUpdate } = useContext(CalendarContext);

  const { title, city, description, id, time } = data;
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
    updateReminder(id, data).then((res) => {
      setTriggerUpdate((prev) => !prev);
      handleModalEdit(id);
      console.log('created Succesfully', res);
    });
  };
  return (
    <div>
      <Modal open={open} onClose={() => handleModalEdit(id)}>
        <Box sx={styles.box}>
          <Box sx={styles.modalText}>
            <Typography
              sx={{ fontWeight: '400', fontSize: '20px' }}
            >{`${title}`}</Typography>
            <TextField
              id={'title'}
              name={'title'}
              label={'Title'}
              required={true}
              fullWidth
              defaultValue={title}
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
              defaultValue={time}
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
              defaultValue={city}
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
              defaultValue={description}
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
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
