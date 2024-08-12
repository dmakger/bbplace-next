import { getSymbolByCodeCurrency } from "@/entities/Metrics/lib/currency/currency.metrics.lib"
import { generateId } from "@/shared/lib/generateId.lib"
import { IOption } from "@/shared/model/option.model"

// wholesale
export const processWholesaleOptionInProductForm = (wholesalePrice?: number, wholesaleQuantity?: number, currencyOption?: IOption, metricOption?: IOption) => {
    return !wholesalePrice || !wholesaleQuantity || !currencyOption || !metricOption
        ? undefined 
        : { 
            id: generateId(), 
            name: `${wholesalePrice} ${getSymbolByCodeCurrency(`${currencyOption.params?.code}`, metricOption.params?.code)} от ${wholesaleQuantity} ${metricOption.params?.shortName}.`,
            params: {
                'price': wholesalePrice,
                'quantity': wholesaleQuantity,
            },
            options: [
                currencyOption,
                metricOption,
            ]
        } as IOption
}

// size
export const processSizeOptionInProductForm = (sizeValue?: string, metricOption?: IOption) => {
    return !sizeValue || !metricOption 
        ? undefined 
        : { 
            id: generateId(), 
            name: `${sizeValue} ${metricOption.params?.shortName}.`,
            params: {
                'size': sizeValue,
            },
            options: [
                metricOption,
            ]
        } as IOption
}