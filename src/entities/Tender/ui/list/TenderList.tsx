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
import { WrapperSortFilter } from '@/shared/ui/Wrapper/SortFilter/ui/WrapperSortFilter'
import { ECatalogVariants } from '@/widgets/SortFilterSidebar'
import { useDispatch } from 'react-redux'
import { PTCSlice } from '@/features/storage/PTC/ptc.storage'
import { EPTC } from '@/widgets/NavBarPTC/model/ptc.model'
import { useSearchParams } from 'next/navigation'
import { paramsToBack } from '@/config/params/backend.params.config'
import { CORE_PARAMS } from '@/config/params/core.params.config'

export const TenderList = () => {
    // ROUTER
    const searchParams = useSearchParams();
    const newParams = paramsToBack(searchParams)
    const applicationValues = CORE_PARAMS.FILTER_VALUES.APPLICATION    

    // STATE
    const [tenderList, setTenderList] = useState<ICommonTender[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [application, setApplication] = useState<string>(applicationValues.DEFAULT)

    //API
    const { data: allTendersApi, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams});
    const { data: saleTendersApi, isLoading: isSaleTendersLoading } = TenderAPI.useGetSaleTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams});
    const { data: purchaseTendersApi, isLoading: isPurchaseTendersLoading } = TenderAPI.useGetPurchaseTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams});

    const { data: countAllTenders, isLoading: isCountAllTendersLoading } = TenderAPI.useGetCountAllTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countSaleTenders, isLoading: isCountSaleTendersLoading } = TenderAPI.useGetCountSaleTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countPurchaseTenders, isLoading: isCountPurchaseTendersLoading } = TenderAPI.useGetCountPurchaseTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });

    //VARIABLES
    const conditionAllTenders = isTendersLoading && isCountAllTendersLoading;
    const conditionSaleTenders = isSaleTendersLoading && isCountSaleTendersLoading;
    const conditionPurchaseTenders = isPurchaseTendersLoading && isCountPurchaseTendersLoading;

    // RTK
    const dispatch = useDispatch();

    //EFFECT 
    useEffect(() => {
        let _application = searchParams.get(CORE_PARAMS.APPLICATION)
        if (_application === null)
            _application = applicationValues.DEFAULT
        setApplication(_application)
    }, [searchParams])

    useEffect(() => {
        if ((application === null || application === applicationValues.DEFAULT) && allTendersApi)
            setTenderList(getAllTendersAtOneArray(allTendersApi))
        else if (application === applicationValues.SELL && saleTendersApi)
            setTenderList(saleTendersApi)
        else if (application === applicationValues.PURCHASE && purchaseTendersApi)
            setTenderList(purchaseTendersApi)
    }, [allTendersApi, saleTendersApi, purchaseTendersApi, application])

    useEffect(() => {
        let amount = 0
        let view = EPTC.TENDER
        if (!isCountAllTendersLoading && countAllTenders !== undefined && (application === null || application === applicationValues.DEFAULT)) {
            amount = countAllTenders
        }
        if (!isCountSaleTendersLoading && countSaleTenders !== undefined && application === applicationValues.SELL) {
            amount = countSaleTenders
        }
        if (!isCountPurchaseTendersLoading && countPurchaseTenders !== undefined && application === applicationValues.PURCHASE) {
            amount = countPurchaseTenders
        }
        console.log('application', application, amount);
        

        dispatch(PTCSlice.actions.setPTC({amount, view,}), {refetchOnMountOrArgChange: true});
    }, [dispatch, countAllTenders, countSaleTenders, countPurchaseTenders, application, isCountAllTendersLoading, isCountSaleTendersLoading, isCountPurchaseTendersLoading])

    if (conditionAllTenders || conditionSaleTenders || conditionPurchaseTenders)
        return <div>Loading...</div>

    return (
        <WrapperSortFilter variant={ECatalogVariants.TENDERS}>
            <WrapperPagination amount={countAllTenders ? countAllTenders : 1} 
                                active={pageNumber} keyPageParam={TENDER_PARAMS.NUMBER_PAGE__KEY} 
                                set={setPageNumber}>
                <div className={cl.TenderList}>
                    {tenderList.map(it => (
                        <TenderItem tender={it} key={it.id} />
                    ))}
                </div>
            </WrapperPagination>
        </WrapperSortFilter>
    )
}