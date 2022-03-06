import { days } from '../constants/days'

// When having a full API that supports many request, ill change this.
export const getDayString = (number, month) =>
    days[new Date(`${month} ${number},2022`).getDay()].slice(0, 3)
