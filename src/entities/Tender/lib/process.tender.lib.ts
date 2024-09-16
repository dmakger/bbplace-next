import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { ETenderType, ETenderTypeEn, IProcessTender, IPurchaseTender, ISaleTender, ITender, ITenderAPI } from "../model/tender.model";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { metricsTenderToObject } from "@/entities/Metrics/lib/metrics/base.metrics.metrics.lib";
import { currencyTenderToObject } from "@/entities/Metrics/lib/currency/currency.metrics.lib";
import { getTenderType } from "./tender.lib";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";


export const tenderAPIListToTenderList = (tenderListAPI: ITenderAPI[], metrics?: IMetrics[], currencyList?: ICurrency[], type?: ETenderTypeEn): ITender[] => {
    return tenderListAPI.map(it => {
        const r = tenderAPIToTender({ tenderAPI: it, metrics, currencyList })
        return {...r, type: r.type ?? type}
    })
}


export const tenderAPIToTender = ({ tenderAPI, metrics, currencyList }: IProcessTender) => {
    const attachments = JSON.parse(tenderAPI.attachments)

    const currency = currencyTenderToObject(tenderAPI.currency, currencyList);
    const unitsKey = getTenderType(tenderAPI) === ETenderType.SALE ? 'minOrderUnits' : 'quantityUnits'
    
    const unitsValue = tenderAPI[unitsKey];

    const units = unitsValue && metrics ? metricsTenderToObject(unitsValue, metrics) : undefined

    return {
        ...tenderAPI,
        attachments,
        currency,
        [unitsKey]: units
    } as ISaleTender | IPurchaseTender
}


export const getTenderWholesalePrices = (tender: ISaleTender | IPurchaseTender, tenderType: ETenderTypeEn) => {

    const currency = tender.currency
    let price;
    let quantity;
    let metrics;

    if (tenderType === ETenderTypeEn.SALE) {
        const _tender = tender as ISaleTender

        price = _tender.price
        quantity = _tender.minOrder
        metrics = _tender.minOrderUnits
    }
    else {
        const _tender = tender as IPurchaseTender

        price = _tender.maximumBudget
        quantity = _tender.quantity
        metrics = _tender.quantityUnits
    }

    return {
        price,
        quantity,
        currency,
        metrics
    } as IWholesale

}

