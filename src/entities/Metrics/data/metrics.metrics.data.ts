// DIMENSIONS: {Размеры - Миллиметры}
export const DIMENSIONS_DATA: Record<string, number> = {
    "Миллиметры": 1, 
    "Сантиметры": 10,
    "Квадратные сантиметры": 100, 
    "Метры": 1000, 
    "Квадратные метры": 1000000, 
    "Кубические метры": 1000000,
}

// VOLUME: {Объем - Миллилитр}
export const VOLUME_DATA: Record<string, number> = {
    "Кубические сантиметры": 1, 
    "Литры": 1000,
}

// MASS: {Масса - Граммы}
export const MASS_DATA: Record<string, number> = {
    "Граммы": 1,
    "Килограммы": 1000, 
    "Тонны": 1000000,
}

// UNITS: {Единицы - Единицы измерения}
export const UNITS_DATA: Record<string, number> = {
    "Штуки": 1,
    "Российский размер": 1,
}


// ======={ PARAMETERS }=======
// Элементы расположены по приоритету от меньшего к большему
export enum EParameters {
    DIMENSIONS,
    VOLUME,
    MASS,
    UNITS,
}


export const PARAMETERS_TO_DATA: Record<EParameters, Record<string, number>> = {
    [EParameters.DIMENSIONS]: DIMENSIONS_DATA,
    [EParameters.VOLUME]: VOLUME_DATA,
    [EParameters.MASS]: MASS_DATA,
    [EParameters.UNITS]: UNITS_DATA
}