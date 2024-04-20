// a: продуктов
// b: продукт
// с: продуктa
export const getTextByNumber = (n: number, a: string, b: string, c: string) => {
    const n10 = n % 10
    if (10 < n && n < 15 || 4 < n10 && n10 <= 9 || n10 === 0)
        return a
    if (n10 === 1)
        return b
    return c
}


// Для результата
export const getResultTextByNumber = (n: number) => {
    return getTextByNumber(n, "результатов", "результат", "результата")
}
