import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(6, 'Title should have at least 6 characters')
        .max(30, 'Title Name must not exceed 30 characters'),
    city: Yup.string().max(30, 'City Name must not exceed 30 characters'),
    description: Yup.string()
        .max(30, 'Description Name must not exceed 30 characters')
        .min(6, 'Description should have at least 6 characters'),
})
