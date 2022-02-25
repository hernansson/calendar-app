import { useContext, useState } from 'react'
import { CalendarContext } from '../../context/calendarContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { validationSchema } from '../validations/validationSchemas'
import { createReminder } from '../../api/calendarAPI/createReminder'
import { TextField, Typography, Button, Box } from '@mui/material'
import WeatherIcon from './WeatherIcon'
import SaveIcon from '@mui/icons-material/Save'
import { getWeatherInitials } from '../../utils/getWeatherInitials'
import { styles } from './styles'
export default function CreateForm({ day }) {
    const { setTriggerUpdate } = useContext(CalendarContext)
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const onSubmit = (data) => {
        createReminder(day, { ...data, city, weather }).then((res) => {
            setTriggerUpdate((prev) => !prev)
            console.log('created Succesfully', res)
        })
    }
    const handleCity = (e) => {
        setCity(e.target.value)
    }
    const handleBlur = (e) => {
        const city = e.target.value
        getWeatherInitials(city)
            .then((abb) => setWeather(abb))
            .catch((err) => console.error(err))
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) })
    return (
        <>
            <Box sx={styles.modalText}>
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
                    inputProps={{
                        maxLength: 30,
                        'data-testid': 'title-test',
                    }}
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
                    inputProps={{ step: 300, 'data-testid': 'time-test' }}
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
                    inputProps={{ maxLength: 30, 'data-testid': 'city-test' }}
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
                    inputProps={{ maxLength: 30, 'data-testid': 'desc-test' }}
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
                        <SaveIcon sx={{ width: '18px', heigth: '18px' }} />
                    }
                >
                    Create
                </Button>
            </Box>
        </>
    )
}
