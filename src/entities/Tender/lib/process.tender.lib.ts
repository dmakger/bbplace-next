import { ICommonTender, ITenderApi } from "../model/tender.model";

export const getAllTendersAtOneArray = (allTenders: ITenderApi) => {
    const commonArray:ICommonTender[] = []

    allTenders.purchaseRequests.map(it => commonArray.push(it))
    allTenders.saleRequests.map(it => commonArray.push(it))

    return commonArray.sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime());
}