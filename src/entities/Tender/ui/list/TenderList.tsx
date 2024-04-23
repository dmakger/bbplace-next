'use client'

import cl from './_TenderList.module.scss'
import { useEffect, useState } from "react"
import { ICommonTender } from "../../model/tender.model"
import { TenderAPI } from "../../api/tender.api"
import { TENDER_ARGS_REQUEST } from "../../data/tender.data"
import { getAllTendersAtOneArray } from "../../lib/process.tender.lib"
import { TenderItem } from "../.."
import { WrapperPagination } from "@/shared/ui/Wrapper/Pagination/ui/WrapperPagination"
import { TENDER_PARAMS } from "@/config/params/tender.params.config"

export const TenderList = () => {

    // STATE
    const [tenderList, setTenderList] = useState<ICommonTender[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)

    //API
    const { data: allTendersApi, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery({ limit: TENDER_ARGS_REQUEST.limit, page: pageNumber - 1 });
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
            <WrapperPagination active={pageNumber} set={setPageNumber} amount={countAllTenders ? countAllTenders : 1} keyPageParam={TENDER_PARAMS.NUMBER_PAGE__KEY}>
                <div className={cl.TenderList}>
                    {tenderList.map(it => (
                        <TenderItem tender={it} key={it.id} />
                    ))}
                </div>
            </WrapperPagination>

        </>
    )
}