import * as React from 'react';
import { TextField, Typography, Button, Box, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchemas';
import SaveIcon from '@mui/icons-material/Save';
import { createReminder } from '../../api/calendarAPI/createReminder';
const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    p: 2,
  },
  modalText: {
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
};

export default function AddEventModal({ open, setOpen, day }) {
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
    createReminder(day, data).then((res) =>
      console.log('created Succesfully', res)
    );
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style.box}>
          <Box sx={style.modalText}>
            <Typography
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
          <Box sx={style.modalText}>
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
          <Box sx={style.modalText}>
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
          <Box sx={style.modalText}>
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
              ...style.modalText,
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
