export const getRemindersByDay = (day, month) => {
    return JSON.parse(localStorage.getItem('reminders')).filter(
        (reminder) => reminder.day == day && reminder.month == month
    )
}
