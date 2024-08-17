const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (value: string) => {
    return EMAIL_PATTERN.test(value);
}

export const isTelEmailValid = (value: string) => {
    const telPattern = /^\+?(7|8|375|380|998|374|995|373|993)\d{7,10}$/;
    return EMAIL_PATTERN.test(value) || telPattern.test(value);
}

export const EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты'

export const TEL_N_EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты или номер телефона'