import { TIME_UNIT__OPTION__DATA, YEAR__TIME_UNIT__OPTION__DATA } from "@/shared/data/option/timeUnit.option.data";
import { IOption } from "@/shared/model/option.model";

/**
 * Перевод `expirationDate`, `expirationDateMetric` из интерфейс `IPropsAdditionalInfoProductForm` в `string`  
 * Необходим для перевода данный в `IProduct`
 */
export const expirationDateAndMetricToExpirationDate = (expirationDate: string, expirationDateMetric: IOption) => {
    return `${expirationDate} ${expirationDateMetric.name}`
}


/**
 * Перевод `expirationDate` из `ICharacteristic` в `expirationDate`, `expirationDateMetric`  
 * Необходим для перевода данных из `IProduct` в `IPropsAdditionalInfoProductForm`
 */
export const expirationDateToExpirationDateAndMetric = (expirationDate: string, sep=' ') => {
    const _expirationDate = expirationDate.split(sep)
    return {
        expirationDate: _expirationDate[0],
        expirationDateMetric: TIME_UNIT__OPTION__DATA.find(it => it.name === _expirationDate[1]) ?? YEAR__TIME_UNIT__OPTION__DATA,
    }
}


/**
 * Перевод `строки` в `список строк`.  
 * Необходим для перевода данных из `IPropsAdditionalInfoProductForm` в `IProduct`
 */
export const equipmentToEquipmentList = (equipment: string, sep='\n') => {
    return equipment.split(sep)
}


/**
 * Перевод `списка строк` в `строку`.  
 * Необходим для перевода данных из `IProduct` в `IPropsAdditionalInfoProductForm`
 */
export const equipmentListToEquipment = (equipmentList: string[], sep='\n') => {
    return equipmentList.join(sep)
}
