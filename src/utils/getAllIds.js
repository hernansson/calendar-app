export const getAllIds = (data) => {
    const ids = data.map((remi) => remi.id)
    const objtIds = ids.reduce((acc, cur) => {
        acc[cur] = false
        return acc
    }, {})

    return objtIds
}
