export const getListRemindersURL = (month) => {
    const reminders = JSON.parse(localStorage.getItem('reminders'))
    return reminders
        ? reminders.filter((reminder) => reminder.month == month)
        : []
}
