import SaveIcon from '@mui/icons-material/Save';
import Confirm from './modals/ConfirmModal';
import ButtonDialog from './modals/ButtonDialog';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { updateReminder } from '../../api/calendarAPI/updateReminder';
import { CalendarContext } from '../../context/calendarContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../validations/validationSchemas';
export default function SaveButton({
  isOpen,
  handleClose,
  handleConfirm,
  handleSubmit,
}) {
  return (
    <div>
      <Button
        variant='contained'
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          minWidth: '64px',
          '&hover': '',
        }}
        onClick={handleSubmit}
        startIcon={<SaveIcon sx={{ width: '18px', heigth: '18px' }} />}
      >
        Save
      </Button>
    </div>
  );
}
