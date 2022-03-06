export const updateReminder = (info) => {
    const getReminders = JSON.parse(localStorage.getItem('reminders'))
    const updateReminderIndex = getReminders.findIndex(
        (remi) => remi.id == info.id
    )
    getReminders[updateReminderIndex] = info

    localStorage.setItem('reminders', JSON.stringify(getReminders))
}
