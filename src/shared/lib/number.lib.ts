/**
 * Является ли строка числом, например:
 * 1. `"123"` => `true`
 * 1. `"qwe"` => `false`
 */
export const isNumeric = (value: string) => {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}