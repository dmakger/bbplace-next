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


export const getDaysDifference = (_dayA: Date | string, _dayB: Date | string) => {
    const dayA: Date = new Date(stringToDate(_dayA))
    const dayB: Date = new Date(stringToDate(_dayB))
    // Обнуляем время, чтобы избежать влияния на вычисление разницы в днях
    dayA.setHours(0, 0, 0, 0);
    dayB.setHours(0, 0, 0, 0);

    // Вычисляем разницу в миллисекундах
    const differenceInMilliseconds = dayB.getTime() - dayA.getTime();

    // Конвертируем разницу в миллисекундах в разницу в днях
    const differenceInDays = differenceInMilliseconds / MILLISECONDS_IN_A_DAY;

    // Возвращаем абсолютное значение разницы в днях
    return Math.abs(Math.round(differenceInDays));
}

export const getTime = (_day: Date | string, sep: string = ':') => {
    const day = typeof _day === 'string' ? new Date(_day) : _day
    const minutes = day.getMinutes()
    let minutesString = String(minutes)
    if (minutes < 10)
        minutesString = `0${minutes}`
    return day.getHours() + sep + minutesString
}

const getDayOfWeek = (day: Date) => {
    return DAYS_OF_WEEK[day.getDay()]
}

const stringToDate = (date: string | Date) => {
    return typeof date === 'string' ? new Date(date) : date
}
