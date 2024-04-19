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
    const { data: allTendersApi, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery(TENDER_ARGS_REQUEST)
    const { data: countAllTenders, isLoading: isCountTendersLoading } = TenderAPI.useGetCountAllTendersQuery(TENDER_ARGS_REQUEST, { refetchOnMountOrArgChange: true })

    useEffect(() => {
        if (allTendersApi)
            setTenderList(getAllTendersAtOneArray(allTendersApi))
    }, [allTendersApi])

    if (isTendersLoading && isCountTendersLoading)
        return <div>Loading...</div>

    return (
        <>
            {tenderList.map(it => (
                <TenderItem tender={it} />
            ))}
        </>
    )
}