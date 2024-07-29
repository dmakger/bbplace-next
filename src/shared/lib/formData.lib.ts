/**
 * Возвращает все данные из `formData`
 */
export const getFormData = (formData: FormData) => {
    const tempDataStorage: Record<string, any> = {}
    formData.forEach((value, key) => {
        tempDataStorage[key] = value
    })
    return tempDataStorage;
}


/**
 * Возвращает все данные которые указаны в форме
 * @param formRefCurrent - `HTMLFormElement`
 * @returns 
 */
export const getFormDataFromForm = (formRefCurrent: HTMLFormElement) => {
    let formData = new FormData(formRefCurrent)
    return getFormData(formData);
}


/**
 * Возвращает все данные которые указаны в форме
 * @param formRefCurrent - `HTMLDivElement`
 * @returns 
 */
export const getFormDataFromDiv = (formRefCurrent: HTMLDivElement) => {
    const inputs = formRefCurrent.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
    const formData = new FormData();

    inputs.forEach(input => {
        formData.append(input.name, input.value);
    });

    const tempDataStorage: Record<string, any> = {};
    formData.forEach((value, key) => {
        tempDataStorage[key] = value;
    });
}