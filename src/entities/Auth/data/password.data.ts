export const isPasswordValid = (value: string) => {
    if (value && !(value.match(/[0-9]/)
        && value.match(/[A-Z]/)
        && value.match(/[a-z]/)
        && value.length >= 5)) {
        return false;
    }
    return true
}

export const PASSWORD_VALID_RULES = 'Пароль должен быть не короче 5 символов, содержать минимум одну цифру, заглавную и прописную буквы'
export const PASSWORD_MATCHING_ERROR = 'Пароли не совпадают'