'use client'

import { useEffect, useState } from "react"
import { ICommonTender } from "../../model/tender.model"
import { TenderAPI } from "../../api/tender.api"
import { TENDER_ARGS_REQUEST } from "../../data/tender.data"
import { getAllTendersAtOneArray } from "../../lib/process.tender.lib"
import { TenderItem } from "../.."

export const TenderList = () => {

    // STATE
    const [tenderList, setTenderList] = useState<ICommonTender[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)

    //API
    const { data: allTendersApi, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery(TENDER_ARGS_REQUEST);
    const { data: saleTendersApi, isLoading: isSaleTendersLoading } = TenderAPI.useGetSaleTendersQuery(TENDER_ARGS_REQUEST);
    const { data: purchaseTendersApi, isLoading: isPurchaseTendersLoading } = TenderAPI.useGetPurchaseTendersQuery(TENDER_ARGS_REQUEST);

    const { data: countAllTenders, isLoading: isAllTendersCountLoading } = TenderAPI.useGetCountAllTendersQuery(TENDER_ARGS_REQUEST, { refetchOnMountOrArgChange: true });
    const { data: countSaleTenders, isLoading: isSaleTendersCountLoading } = TenderAPI.useGetCountSaleTendersQuery(TENDER_ARGS_REQUEST, { refetchOnMountOrArgChange: true });
    const { data: countPurchaseTenders, isLoading: isPurchaseTendersCountLoading } = TenderAPI.useGetCountPurchaseTendersQuery(TENDER_ARGS_REQUEST, { refetchOnMountOrArgChange: true });

    //VARIABLES
    const conditionAllTenders = isTendersLoading && isAllTendersCountLoading;
    const conditionSaleTenders = isSaleTendersLoading && isSaleTendersCountLoading;
    const conditionPurchaseTenders = isPurchaseTendersLoading && isPurchaseTendersCountLoading;

    //EFFECT 
    
    useEffect(() => {
        if (allTendersApi)
            setTenderList(getAllTendersAtOneArray(allTendersApi))
    }, [allTendersApi])

    if (conditionAllTenders || conditionSaleTenders || conditionPurchaseTenders)
        return <div>Loading...</div>

    return (
        <>
            {tenderList.map(it => (
                <TenderItem tender={it} />
            ))}
        </>
    )
}