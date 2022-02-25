import {
    TextField,
    Typography,
    Button,
    Box,
    Modal,
    IconButton,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'
import { memo, useContext, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { validationSchema } from '../../validations/validationSchemas'
import { createReminder } from '../../../api/calendarAPI/createReminder'
import { CalendarContext } from '../../../context/calendarContext'
import { styles } from '../styles'
import { AddEventTypo } from '../../styledComponents/AddEventTypo'
import { getWeatherInitials } from '../../../utils/getWeatherInitials'
import WeatherIcon from '../WeatherIcon'
import CloseButton from '../../buttons/CloseButton'

function AddEventModal({ day, minimalist }) {
    const { setTriggerUpdate } = useContext(CalendarContext)
    const [open, setOpen] = useState(false)
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const handleCity = (e) => {
        setCity(e.target.value)
    }
    const handleModal = () => setOpen((prev) => !prev)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) })
    // I'll use async await, just show . but Its always better to choose one.

    const handleBlur = (e) => {
        const city = e.target.value
        getWeatherInitials(city)
            .then((abb) => setWeather(abb))
            .catch((err) => console.error(err))
    }
    const onSubmit = (data) => {
        createReminder(day, { ...data, city, weather }).then((res) => {
            setTriggerUpdate((prev) => !prev)
            handleModal()
            console.log('created Succesfully', res)
        })
    }
    return (
        <div>
            {minimalist ? (
                <IconButton onClick={handleModal}>
                    <AddCircleIcon
                        sx={{ color: 'primary.main' }}
                        style={{ fontSize: 36 }}
                    />
                </IconButton>
            ) : (
                <AddEventTypo
                    color="text.primary"
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
                            color="text.primary"
                            sx={{ fontWeight: '400', fontSize: '20px' }}
                        >
                            {`${day}/02 - Add Event`}
                        </Typography>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            required
                            fullWidth
                            margin="dense"
                            variant="standard"
                            autoComplete="off"
                            inputProps={{ maxLength: 30 }}
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
                        <TextField
                            id="time"
                            label="Time"
                            name="time"
                            variant="standard"
                            type="time"
                            defaultValue="07:30"
                            {...register('time')}
                            error={!!errors.time}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            sx={{ width: 150 }}
                        />

                        <WeatherIcon weather={weather} />
                    </Box>
                    <Box sx={styles.modalText}>
                        <TextField
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            margin="dense"
                            variant="standard"
                            autoComplete="off"
                            inputProps={{ maxLength: 30 }}
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
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                minWidth: '64px',
                                '&hover': '',
                            }}
                            onClick={handleSubmit(onSubmit)}
                            startIcon={
                                <SaveIcon
                                    sx={{ width: '18px', heigth: '18px' }}
                                />
                            }
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
export default memo(AddEventModal)
