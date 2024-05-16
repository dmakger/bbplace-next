export const getFormData = (formRefCurrent: HTMLFormElement) => {
    let formData = new FormData(formRefCurrent)
    const tempDataStorage: Record<string, any> = {}
    formData.forEach((value, key) => {
        tempDataStorage[key] = value
    })
    return tempDataStorage;
}