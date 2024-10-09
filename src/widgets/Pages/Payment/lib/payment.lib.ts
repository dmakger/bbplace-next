
import { IOption } from "@/shared/model/option.model";
import { ETTVariants } from "../../Tariffs/model/tariffs.model";
import { PREMIUM_TARIFFS_BANNER_12_MONTH_INFO, TARIFFS_PAYMENT_INFO_OPTIONS_ARRAY } from "../../Tariffs/data/tariffs.data";

/**
 * Получение информации (mainText или footerText) выбранного тарифа
 * @param tariffsState  - состояние тарифа { type: IOption, duration: IOption }
 * @param nessesaryInfo - искомая информация (mainText или footerText)
 * @returns искомую информацию
 */
export const getSelectedTariffsInfo = (tariffsState: { type: IOption, duration: IOption }, nessesaryInfo: 'mainText' | 'footerText') => {
    //Получаем тип тарифа
    const infoArray = TARIFFS_PAYMENT_INFO_OPTIONS_ARRAY[tariffsState.type?.value as ETTVariants];
    //Получаем массив длительностей выбранного тарифа
    const selectedInfo = infoArray?.find(it => it[nessesaryInfo].includes(tariffsState.duration?.value as string));
    //Возвращаем выбранный ключ массива или последний элемент массива (12 месяцев - самый выгодный) или массив длительностей для 12 месяцев премиум тарифа
    return selectedInfo?.[nessesaryInfo] ?? infoArray?.slice(-1)[0]?.[nessesaryInfo] ?? PREMIUM_TARIFFS_BANNER_12_MONTH_INFO[nessesaryInfo];
}