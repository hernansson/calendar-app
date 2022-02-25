import {
    TextField,
    Typography,
    IconButton,
    Box,
    Modal,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { memo, useContext, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { validationSchema } from '../../validations/validationSchemas'
import { updateReminder } from '../../../api/calendarAPI/updateReminder'
import { CalendarContext } from '../../../context/calendarContext'
import { styles } from '../styles'
import DeleteButton from '../../buttons/DeleteButton'
import SaveButton from '../../buttons/SaveButton'
import WeatherIcon from '../WeatherIcon'
import { getWeatherInitials } from '../../../utils/getWeatherInitials'
import CloseButton from '../../buttons/CloseButton'
import { getAllDaysInMonth } from '../../../utils/timeFunctions'

// As im using useForm, I have some conflicts using the onBlur on register. So just created a state to manage city
// separately. So as to show a weather icon on demand.
function EditEventModal({ open, handleModalEdit, data }) {
    const { setTriggerUpdate } = useContext(CalendarContext)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmSave, setOpenConfirmSave] = useState(false)
    const { title, city, description, id, time, weather, monthId } = data
    const [cityEdit, setCityEdit] = useState(city)
    const [weatherEdit, setWeatherEdit] = useState(weather)
    const [isEditable, setIsEditable] = useState(false)
    const [day, setDay] = useState(monthId)

    //Just because of how api works :S
    const handleDay = (event) => {
        setDay(event.target.value)
    }
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 256,
                width: 80,
            },
        },
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) })

    const handleEdit = () => {
        setIsEditable((prev) => !prev)
    }
    const handleCity = (e) => {
        setCityEdit(e.target.value)
    }
    const handleConfirmDelete = () => {
        setOpenConfirmDelete((prev) => !prev)
    }
    const handleBlur = (e) => {
        const city = e.target.value

        getWeatherInitials(city)
            .then((abb) => setWeatherEdit(abb))
            .catch((err) => console.error(err))
    }
    const handleConfirmSave = () => {
        setOpenConfirmSave((prev) => !prev)
    }
    const handleClose = () => {
        handleModalEdit(id)
    }
    const onSubmit = (data) => {
        updateReminder(id, {
            ...data,
            city: cityEdit,
            weather: weatherEdit,
            monthId: day.toString(),
        }).then((res) => {
            setTriggerUpdate((prev) => !prev)

            console.log('created Succesfully', res)
        })
    }
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.box}>
                    <Box sx={styles.modalText}>
                        <CloseButton handleClose={handleClose} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                color="text.primary"
                                sx={{ fontWeight: '400', fontSize: '20px' }}
                            >
                                {isEditable ? 'Edit Reminder' : 'Reminder'}
                            </Typography>
                            <IconButton onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                        </Box>

                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            disabled={!isEditable}
                            inputProps={{ maxLength: 30 }}
                            fullWidth
                            defaultValue={title}
                            margin="dense"
                            variant="standard"
                            autoComplete="off"
                            {...register('title')}
                            error={!!errors.title}
                        />
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{ textAlign: 'left' }}
                        >
                            {errors.title?.message}
                        </Typography>
                    </Box>
                    <Box sx={styles.modalText}>
                        <FormControl variant="standard">
                            <InputLabel>Day</InputLabel>
                            <Select
                                disabled={!isEditable}
                                value={day}
                                label="Day"
                                onChange={handleDay}
                                MenuProps={MenuProps}
                            >
                                {getAllDaysInMonth(2, 2022).map((day) => {
                                    const num = day.getDate()
                                    return (
                                        <MenuItem key={num} value={num}>
                                            {num}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={styles.modalText}>
                        <TextField
                            id="time"
                            label="Time"
                            name="time"
                            variant="standard"
                            disabled={!isEditable}
                            type="time"
                            defaultValue={time}
                            {...register('time')}
                            error={!!errors.time}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            sx={{ width: 150 }}
                        />
                        <WeatherIcon weather={weatherEdit} />
                    </Box>
                    <Box sx={styles.modalText}>
                        <TextField
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            disabled={!isEditable}
                            defaultValue={city}
                            inputProps={{ maxLength: 30 }}
                            margin="dense"
                            variant="standard"
                            autoComplete="off"
                            onChange={handleCity}
                            onBlur={handleBlur}
                            error={!!errors.city}
                        />
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{ textAlign: 'left' }}
                        >
                            {errors.city?.message}
                        </Typography>
                    </Box>
                    <Box sx={styles.modalText}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            inputProps={{ maxLength: 30 }}
                            disabled={!isEditable}
                            defaultValue={description}
                            margin="dense"
                            variant="standard"
                            autoComplete="off"
                            {...register('description')}
                            error={!!errors.description}
                        />
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{ textAlign: 'left' }}
                        >
                            {errors.description?.message}
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
                            icon={<DeleteForeverIcon />}
                        />
                        {isEditable && (
                            <SaveButton
                                id={id}
                                handleSubmit={handleSubmit(onSubmit)}
                                handleConfirm={handleConfirmSave}
                                isOpen={openConfirmSave}
                                handleClose={handleClose}
                            />
                        )}
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
export default memo(EditEventModal)
