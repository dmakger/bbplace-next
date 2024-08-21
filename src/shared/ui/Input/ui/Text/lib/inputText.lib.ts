export const isValueExceededMaxLength = (value: string, maxLength: number) => {
    if(value.length === maxLength) return `Вы превысили допустимое количество символов (не более ${maxLength})`;
}