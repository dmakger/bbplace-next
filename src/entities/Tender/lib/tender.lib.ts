import { ETenderType, ITender, ITenderAPI } from "../model/tender.model";

export const getTenderType = (tender: ITender | ITenderAPI) => tender?.hasOwnProperty('minOrderUnits') ?  ETenderType.SALE : ETenderType.PURCHASE;


export const toTenderType = (tenderType?: string) => {
    if (!tenderType) return

    const tenderTypeLower = tenderType.toLocaleLowerCase()
    if (tenderTypeLower === 'sale' || tenderTypeLower === 'продажа')
        return ETenderType.SALE
    
    if (tenderTypeLower === 'purchase' || tenderTypeLower === 'покупка')
        return ETenderType.PURCHASE
}

export const tenderTypeToEn = (tenderType: ETenderType) => {
    console.log('tenderTypeToEn', tenderType, tenderType === ETenderType.PURCHASE ? 'Purchase' : 'Sale');
    
    if (tenderType === ETenderType.PURCHASE)
        return 'Purchase'
    return 'Sale'
}