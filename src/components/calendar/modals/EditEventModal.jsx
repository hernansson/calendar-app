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
import { memo, useContext, useEffect, useState } from 'react'
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
import { months } from '../../../constants/months'

// As im using useForm, I have some conflicts using the onBlur on register. So just created a state to manage city
// separately. So as to show a weather icon on demand.
function EditEventModal({ open, handleModalEdit, info }) {
    const { setTriggerUpdate, month } = useContext(CalendarContext)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmSave, setOpenConfirmSave] = useState(false)
    const { title, city, description, id, time, weather, day } = info
    const [weatherEdit, setWeatherEdit] = useState(weather)
    const [isEditable, setIsEditable] = useState(false)

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) })

    const handleEdit = () => {
        setIsEditable((prev) => !prev)
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
        updateReminder({
            ...data,
            id,
            weather: weatherEdit,
        })

        setTriggerUpdate((prev) => !prev)
        console.log('created Succesfully')
    }

    useEffect(() => {
        //default value
        setValue('title', title)
        setValue('description', description)
        setValue('time', time)
        setValue('day', day)
        setValue('city', city)
        setValue('month', month)
    }, [])
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.box}>
                    <Box>
                        <CloseButton handleClose={handleClose} />
                        <Box sx={styles.eventModalBox}>
                            <Typography
                                color="text.primary"
                                sx={{ fontWeight: '400', fontSize: '20px' }}
                            >
                                {isEditable ? 'Edit Reminder' : 'Reminder'}
                            </Typography>
                            <Box sx={{ display: 'flex', columnGap: '8px' }}>
                                <DeleteButton
                                    handleConfirm={handleConfirmDelete}
                                    isOpen={openConfirmDelete}
                                    id={id}
                                    handleClose={handleClose}
                                />
                                <IconButton onClick={handleEdit}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={styles.modalText}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                disabled={!isEditable}
                                inputProps={{ maxLength: 30 }}
                                fullWidth
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
                    </Box>
                    <Box sx={styles.inline}>
                        <Box sx={styles.modalText}>
                            <FormControl variant="standard">
                                <InputLabel>Months</InputLabel>
                                <Select
                                    id="month"
                                    name="month"
                                    label="Month"
                                    disabled={!isEditable}
                                    MenuProps={styles.MenuPropsMonth}
                                    defaultValue={month}
                                    {...register('month')}
                                >
                                    {months.map((month, idx) => {
                                        return (
                                            <MenuItem key={idx} value={idx + 1}>
                                                {month}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={styles.modalText}>
                            <FormControl variant="standard">
                                <InputLabel>Day</InputLabel>
                                <Select
                                    id="day"
                                    name="day"
                                    label="Day"
                                    disabled={!isEditable}
                                    MenuProps={styles.MenuProps}
                                    defaultValue={day}
                                    {...register('day')}
                                >
                                    {getAllDaysInMonth(month, 2022).map(
                                        (day) => {
                                            const num = day.getDate()
                                            return (
                                                <MenuItem key={num} value={num}>
                                                    {num}
                                                </MenuItem>
                                            )
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={styles.modalText}>
                        <TextField
                            id="time"
                            label="Time"
                            name="time"
                            variant="standard"
                            disabled={!isEditable}
                            type="time"
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
                            {...register('city', { onBlur: handleBlur })}
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
