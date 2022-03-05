export const deleteReminder = async (reminderId) => {
    const getReminders = JSON.parse(localStorage.getItem('reminders'))
    const deletedReminder = getReminders.filter(
        (reminders) => reminders.id !== reminderId
    )

    localStorage.setItem('reminders', JSON.stringify(deletedReminder))
}
