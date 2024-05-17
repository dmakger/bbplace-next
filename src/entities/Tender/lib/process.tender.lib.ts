import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { ETenderType, ICommonTender, IProcessTender, IPurchaseTender, ISaleTender, ITender, ITenderAPI } from "../model/tender.model";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { metricsTenderToObject } from "@/entities/Metrics/lib/metrics/base.metrics.metrics.lib";
import { currencyTenderToObject } from "@/entities/Metrics/lib/currency.metrics.lib";
import { getTenderType } from "./tender.lib";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";


export const tenderAPIListToTenderList = (tenderListAPI: ITenderAPI[], metrics: IMetrics[], currencyList: ICurrency[]): ITender[] => {
    return tenderListAPI.map(it => tenderAPIToTender({ tenderAPI: it, metrics, currencyList }))
}


export const tenderAPIToTender = ({ tenderAPI, metrics, currencyList }: IProcessTender) => {
    const attachments = JSON.parse(tenderAPI.attachments)

    const currency =  currencyTenderToObject(tenderAPI.currency, currencyList);
    let minOrderUnits;
    let quantityUnits;

    if (getTenderType(tenderAPI) === ETenderType.SALE) {
        minOrderUnits = tenderAPI.minOrderUnits && metrics ? metricsTenderToObject(tenderAPI.minOrderUnits, metrics) : undefined;
        return {
            ...tenderAPI,
            attachments,
            currency,
            minOrderUnits,
        } as ISaleTender 
    } else {
        quantityUnits = tenderAPI.quantityUnits && metrics ? metricsTenderToObject(tenderAPI.quantityUnits, metrics) : undefined;
        return {
            ...tenderAPI,
            attachments,
            currency,
            quantityUnits
        } as IPurchaseTender
    }

}


export const getTenderWholesalePrices = (tender: ISaleTender | IPurchaseTender, tenderType: ETenderType) => {

    const currency = tender.currency
    let price;
    let quantity;
    let metrics;

    if (tenderType === ETenderType.SALE) {
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