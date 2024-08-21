const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_PATTERN = /^\+?(7|8|375|380|998|374|995|373|993)\d{7,10}$/;

export const isEmailValid = (value: string) => {
    return EMAIL_PATTERN.test(value);
}

export const isTelEmailValid = (value: string) => {
    return EMAIL_PATTERN.test(value) || TEL_PATTERN.test(value);
}

export const isTelValid = (value: string) => {
    return TEL_PATTERN.test(value);
}

export const EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты'

export const TEL_N_EMAIL_VALID_RULES: string = 'Введите корректный адрес электронной почты или номер телефона'

export const TEL_VALID_RULES: string = 'Введите корректный номер телефона'