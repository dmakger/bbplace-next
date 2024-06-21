import { ETenderType, ITender, ITenderAPI } from "../model/tender.model";

export const getTenderType = (tender: ITender | ITenderAPI) => tender?.hasOwnProperty('minOrderUnits') ?  ETenderType.SALE : ETenderType.PURCHASE;



export const toTenderType = (tenderType: string): string => {
    if (Object.values(ETenderType).includes(tenderType as ETenderType)) {
        return tenderType;
    }
    if (tenderType.toLocaleLowerCase() === 'sale')
        return ETenderType.SALE
    
    if (tenderType.toLocaleLowerCase() === 'purchase')
        return ETenderType.PURCHASE

    const key = tenderType as keyof typeof ETenderType;
    return key in ETenderType ? ETenderType[key] : '';
}

export const tenderTypeToEn = (tenderType: ETenderType) => {
    if (tenderType === ETenderType.PURCHASE)
        return 'Purchase'
    return 'Sale'
}