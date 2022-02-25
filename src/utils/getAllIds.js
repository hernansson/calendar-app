export const getAllIds = (data) => {
    const ids = data.flatMap((rem) => rem.reminders).map((remi) => remi.id)
    const objtIds = ids.reduce((acc, cur) => {
        acc[cur] = false
        return acc
    }, {})

    return objtIds
}
