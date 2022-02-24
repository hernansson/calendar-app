import {
  TextField,
  Typography,
  Button,
  Box,
  Modal,
  IconButton,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../validations/validationSchemas';
import SaveIcon from '@mui/icons-material/Save';
import { createReminder } from '../../../api/calendarAPI/createReminder';
import { CalendarContext } from '../../../context/calendarContext';
import { memo, useContext } from 'react';
import { styles } from '../styles';
import { AddEventTypo } from '../../styledComponents/AddEventTypo';
import { useState } from 'react';
import { getWeatherInitials } from '../../../utils/getWeatherInitials';
import WeatherIcon from '../WeatherIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseButton from '../../buttons/CloseButton';
const AddEventModal = ({ day, minimalist }) => {
  const { setTriggerUpdate } = useContext(CalendarContext);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleModal = () => setOpen((prev) => !prev);
  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //I'll use async await, just show . but Its always better to choose one.

  const handleBlur = (e) => {
    const city = e.target.value;
    getWeatherInitials(city)
      .then((abb) => setWeather(abb))
      .catch((err) => console.error(err));
  };
  const onSubmit = (data) => {
    createReminder(day, { ...data, city, weather }).then((res) => {
      setTriggerUpdate((prev) => !prev);
      handleModal();
      console.log('created Succesfully', res);
    });
  };
  return (
    <div>
      {minimalist ? (
        <IconButton onClick={handleModal}>
          <AddCircleIcon />
        </IconButton>
      ) : (
        <AddEventTypo
          color='text.primary'
          sx={{ opacity: '55%' }}
          onClick={handleModal}
        >
          + Event
        </AddEventTypo>
      )}

      <Modal open={open} onClose={handleModal}>
        <Box sx={styles.box}>
          <Box sx={styles.modalText}>
            <CloseButton handleClose={handleModal} />
            <Typography
              color='text.primary'
              sx={{ fontWeight: '400', fontSize: '20px' }}
            >{`${day}/02 - Add Event`}</Typography>
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

            <WeatherIcon weather={weather} />
          </Box>
          <Box sx={styles.modalText}>
            <TextField
              id={'city'}
              name={'city'}
              label={'City'}
              fullWidth
              margin='dense'
              variant='standard'
              autoComplete='off'
              onChange={handleCity}
              onBlur={handleBlur}
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
};
export default memo(AddEventModal);
