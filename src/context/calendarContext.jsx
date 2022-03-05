import { useState, createContext, useEffect } from 'react'
import { getAllIds } from '../utils/getAllIds'
import { getListRemindersURL } from '../api/calendarAPI/getListRemindersURL'
import { fillCalendar } from '../utils/fillCalendar'

export const CalendarContext = createContext()

function CalendarProvider({ children }) {
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [monthInfo, setMonthInfo] = useState(fillCalendar(month))
    const [triggerUpdate, setTriggerUpdate] = useState(false)
    const [isModalReminderOpen, setIsModalReminderOpen] = useState()

    useEffect(() => {
        const reminders = getListRemindersURL(month)
        setIsModalReminderOpen(getAllIds(reminders))
        setMonthInfo(fillCalendar(month, reminders))
    }, [month, triggerUpdate])

    return (
        <CalendarContext.Provider
            value={{
                month,
                setMonth,
                monthInfo,
                setTriggerUpdate,
                isModalReminderOpen,
                setIsModalReminderOpen,
            }}
        >
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarProvider
