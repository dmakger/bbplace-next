export const isEmailValid = (value: string) => {
    if(value.includes('@') && value.includes('.')) return true
    return false;
}

export const EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты'