export const createReminder = (info) => {
    const prevData = localStorage.getItem('reminders')
    const jsonData = JSON.parse(prevData)
    if (jsonData?.length > 0) {
        const newInfo = { ...info, id: jsonData[jsonData.length - 1].id + 1 }
        localStorage.setItem(
            'reminders',
            JSON.stringify([...jsonData, newInfo])
        )
    } else {
        localStorage.setItem('reminders', JSON.stringify([{ ...info, id: 1 }]))
    }
}
