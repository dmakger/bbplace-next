'use client'

import cl from './_TenderList.module.scss'
import { useEffect, useState } from "react"
import { ITender } from "../../model/tender.model"
import { TenderAPI } from "../../api/tender.api"
import { TENDER_ARGS_REQUEST } from "../../data/tender.data"
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
import { tenderAPIListToTenderList } from '../../lib/process.tender.lib'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'

import { SuspenseL } from '@/shared/ui/Wrapper/SuspenseL/SuspenseL'

export const TenderList = () => {
    return (
        <SuspenseL>
            <TenderListChild />
        </SuspenseL>
    )
}

export const TenderListChild = () => {
    // ROUTER
    const searchParams = useSearchParams();
    const newParams = paramsToBack(searchParams)
    const applicationValues = CORE_PARAMS.FILTER_VALUES.APPLICATION    

    // STATE
    const [countPages, setCountPages] = useState<number>(1)
    const [tenderList, setTenderList] = useState<ITender[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [application, setApplication] = useState<string>(applicationValues.DEFAULT)

    //API
    const { data: allTendersApi, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams});
    
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()  


    //COUNT
    const { data: countTenders, isLoading: isCountTendersLoading } = TenderAPI.useGetCountAllTendersQuery({limit: TENDER_ARGS_REQUEST.limit, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countAllTenders, isLoading: isCountAllTendersLoading } = TenderAPI.useGetCountAllTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });


    //VARIABLES
    const conditionAllTenders = isTendersLoading && isCountTendersLoading;

    // RTK
    const dispatch = useDispatch();

    //EFFECT 
    useEffect(() => {
        let _application = searchParams.get(CORE_PARAMS.APPLICATION)
        if (_application === null)
            _application = applicationValues.DEFAULT
        setApplication(_application)
    }, [searchParams])

    // tender list
    useEffect(() => {
        if ((application === null || application === applicationValues.DEFAULT) && allTendersApi && countTenders !== undefined && metrics && currencyList) {
            setTenderList(tenderAPIListToTenderList(allTendersApi, metrics, currencyList))
            setCountPages(countTenders + 1)
        }
    }, [allTendersApi, application, countTenders, metrics, currencyList])    


    // set count tenders
    useEffect(() => {
        let amount = 0
        let view = EPTC.TENDER
        if (!isCountAllTendersLoading && countAllTenders !== undefined && (application === null || application === applicationValues.DEFAULT)) {
            amount = countAllTenders
        }  

        dispatch(PTCSlice.actions.setPTC({amount, view,}), {refetchOnMountOrArgChange: true});
    }, [dispatch, application, isCountAllTendersLoading, countAllTenders])

    if (conditionAllTenders)
        return <div>Loading...</div>

    return (
        <WrapperSortFilter variant={ECatalogVariants.TENDERS}>
            <WrapperPagination amount={countPages} 
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