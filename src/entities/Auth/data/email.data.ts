export const isEmailValid = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
}

export const EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты'