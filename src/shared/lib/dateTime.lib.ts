const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const DAYS_OF_WEEK = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export const formatDate = (date: string | Date) => {
    const oldDate = new Date(date)
    const today = new Date()
    const daysDifference = getDaysDifference(oldDate, today)

    if (daysDifference === 0) {
        return getTime(oldDate)
    } else if (daysDifference < 7) {
        return getDayOfWeek(oldDate)
    }
    return oldDate.toLocaleDateString()
}

export const getDate = (date: Date | string) => {
    if (typeof date === "string")
        return new Date(date).toLocaleDateString()
    return date.toLocaleDateString()
}

export const getDaysDifference = (dayA: Date, dayB: Date) => {
    const timeDifference = dayB.getTime() - dayA.getTime()
    return Math.floor(timeDifference / MILLISECONDS_IN_A_DAY)
}

export const getTime = (day: Date, sep: string = ':') => {
    // const dayString = day.toString()
    // return dayString.substring(dayString.indexOf('T') + 1).substring(dayString.indexOf('.'), 0).substring(0, 5)
    // day.setHours(day.getHours() - 3);
    const minutes = day.getMinutes()
    let minutesString = String(minutes)
    if (minutes < 10)
        minutesString = `0${minutes}`
    return day.getHours() + sep + minutesString
}

const getDayOfWeek = (day: Date) => {
    return DAYS_OF_WEEK[day.getDay()]
}
