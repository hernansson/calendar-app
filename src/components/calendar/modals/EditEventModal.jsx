import { TextField, Typography, Button, Box, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../validations/validationSchemas';
import { updateReminder } from '../../../api/calendarAPI/updateReminder';
import { CalendarContext } from '../../../context/calendarContext';
import { useContext, useState } from 'react';
import { styles } from '../styles';
import DeleteButton from '../DeleteButton';
import SaveButton from '../SaveButton';

export default function EditEventModal({ open, handleModalEdit, data }) {
  const { setTriggerUpdate } = useContext(CalendarContext);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmSave, setOpenConfirmSave] = useState(false);
  const { title, city, description, id, time } = data;
  const {
    setValue,
    register,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const handleConfirmDelete = () => {
    setOpenConfirmDelete((prev) => !prev);
  };
  const handleConfirmSave = () => {
    setOpenConfirmSave((prev) => !prev);
  };
  const handleClose = () => {
    handleModalEdit(id);
  };
  const onSubmit = (data) => {
    console.log(data);
    updateReminder(id, data).then((res) => {
      setTriggerUpdate((prev) => !prev);

      console.log('created Succesfully', res);
    });
  };
  return (
    <div>
      <Modal open={open} onClose={() => handleClose()}>
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
            <DeleteButton
              handleConfirm={handleConfirmDelete}
              isOpen={openConfirmDelete}
              id={id}
              handleClose={handleClose}
            />
            <SaveButton
              id={id}
              handleSubmit={handleSubmit(onSubmit)}
              handleConfirm={handleConfirmSave}
              isOpen={openConfirmSave}
              handleClose={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
