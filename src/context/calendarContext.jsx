import { useState, createContext, useEffect } from 'react'
import { getAllIds } from '../utils/getAllIds'
import { getListRemindersURL } from '../api/calendarAPI/getListRemindersURL'
import { fillCalendar } from '../utils/fillCalendar'
import { updateCalendar } from '../utils/updateCalendar'

export const CalendarContext = createContext()

function CalendarProvider({ children }) {
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [monthInfo, setMonthInfo] = useState(fillCalendar(month))
    const [triggerUpdate, setTriggerUpdate] = useState(false)
    const [isModalReminderOpen, setIsModalReminderOpen] = useState()

    useEffect(() => {
        setMonthInfo(fillCalendar(month)) // API I chose does not support more request. At least show them empty

        getListRemindersURL(month)
            .then((reminders) => {
                setIsModalReminderOpen(getAllIds(reminders))
                setMonthInfo(updateCalendar(reminders, monthInfo, month))
            })
            .catch((err) =>
                console.log(
                    'API not yet implemented,UPGRADE PLAN (Sorry, I dont have any paid service :( )',
                    err
                )
            )
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
