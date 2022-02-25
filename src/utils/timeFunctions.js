import { months } from '../constants/months'

export const getAllDaysInMonth = (month, year) =>
    Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) => new Date(year, month - 1, i + 1)
    )

export const getFirstDayIndex = (month, year) =>
    getAllDaysInMonth(month, year)[0].getDay()

export const getMonthName = (number) => months[number - 1]
