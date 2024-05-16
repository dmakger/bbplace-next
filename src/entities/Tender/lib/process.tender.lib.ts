import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { ETenderType, IProcessTender, ITender, ITenderAPI } from "../model/tender.model";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { metricsTenderToObject } from "@/entities/Metrics/lib/metrics/base.metrics.metrics.lib";
import { currencyTenderToObject } from "@/entities/Metrics/lib/currency.metrics.lib";
import { getTenderType } from "./tender.lib";


export const tenderAPIListToTenderList = (tenderListAPI: ITenderAPI[], metrics: IMetrics[], currencyList: ICurrency[]): ITender[] => {
    return tenderListAPI.map(it => tenderAPIToTender({ tenderAPI: it, metrics, currencyList }))
}


export const tenderAPIToTender = ({ tenderAPI, metrics, currencyList }: IProcessTender) => {
    const attachments = JSON.parse(tenderAPI.attachments)

    const currency =  currencyTenderToObject(tenderAPI.currency, currencyList);
    let minorderunits;
    let quantityunits;

    if (getTenderType(tenderAPI) === ETenderType.SALE) {
        minorderunits = tenderAPI.minorderunits && metrics ? metricsTenderToObject(tenderAPI.minorderunits, metrics) : undefined;
    } else {
        quantityunits = tenderAPI.quantityunits && metrics ? metricsTenderToObject(tenderAPI.quantityunits, metrics) : undefined;
    }

    return {
        ...tenderAPI,
        attachments,
        currency,
        minorderunits,
        quantityunits
    } as ITender

}
