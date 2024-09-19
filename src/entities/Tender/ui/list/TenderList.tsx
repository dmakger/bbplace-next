'use client'

import cl from './_TenderList.module.scss'
import { useEffect, useState } from "react"
import { ETenderTypeEn, ITender } from "../../model/tender.model"
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
import { FavouriteAPI } from '@/entities/Favourite/api/favourite.api'
import { FavouriteType } from '@/entities/Favourite/data/favourite.data'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loader } from '@/shared/ui/Loader'
import { WrapperDefaultTenderNotFound } from '@/shared/ui/Wrapper/Default/ui/Tender/NotFound/WrapperDefaultTenderNotFound'

export const TenderList = () => {
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
    const { data: allTendersAPI, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery(
        (application === null || application === applicationValues.DEFAULT 
            ? {limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams} 
            : skipToken
        ), 
        // { refetchOnMountOrArgChange: true }
    );
    const { data: saleTendersAPI, isLoading: isSaleTendersLoading } = TenderAPI.useGetSaleTendersQuery(
        (application === applicationValues.SELL 
            ? {limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams} 
            : skipToken
        ), 
        // { refetchOnMountOrArgChange: true }
    );
    const { data: purchaseTendersAPI, isLoading: isPurchaseTendersLoading } = TenderAPI.useGetPurchaseTendersQuery(
        (application === applicationValues.PURCHASE 
            ? {limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1, params: newParams} 
            : skipToken
        ), 
        // { refetchOnMountOrArgChange: true }
    );

    //COUNT
    const { data: countTenders, isLoading: isCountTendersLoading } = TenderAPI.useGetCountAllTendersQuery({limit: TENDER_ARGS_REQUEST.limit, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countAllTenders, isLoading: isCountAllTendersLoading } = TenderAPI.useGetCountAllTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countSaleTenders, isLoading: isCountSaleTendersLoading } = TenderAPI.useGetCountSaleTendersQuery({limit: TENDER_ARGS_REQUEST.limit, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countAllSaleTenders, isLoading: isCountAllSaleTendersLoading } = TenderAPI.useGetCountSaleTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countPurchaseTenders, isLoading: isCountPurchaseTendersLoading } = TenderAPI.useGetCountPurchaseTendersQuery({limit: TENDER_ARGS_REQUEST.limit, params: newParams}, { refetchOnMountOrArgChange: true });
    const { data: countAllPurchaseTenders, isLoading: isCountAllPurchaseTendersLoading } = TenderAPI.useGetCountPurchaseTendersQuery({limit: 1, params: newParams}, { refetchOnMountOrArgChange: true });
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()  

    // const { data: tenderSaleFavorite } = FavouriteAPI.useAreInFavoritesQuery(
    //     isAuth() && (saleTendersAPI || allTendersAPI) ? {objectIds: saleTendersAPI ? saleTendersAPI.map(it => it.id), objectType: FavouriteType.TenderSale} : skipToken,
    //     { refetchOnMountOrArgChange: true }
    // )
    // const { data: tenderPurchaseFavorite } = FavouriteAPI.useAreInFavoritesQuery(
    //     isAuth() && (purchaseTendersAPI || allTendersAPI) ? {objectIds: purchaseTendersAPI.map(it => it.id), objectType: FavouriteType.TenderSale} : skipToken,
    //     { refetchOnMountOrArgChange: true }
    // )
    const [areInFavorites] = FavouriteAPI.useAreInFavoritesMMutation()


    //VARIABLES
    const conditionAllTenders = isTendersLoading && isCountTendersLoading;
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

    // tender list
    useEffect(() => {
        if(metrics && currencyList){
            if ((application === null || application === applicationValues.DEFAULT) && allTendersAPI && countTenders !== undefined ) {
                setTenderList(tenderAPIListToTenderList(allTendersAPI, metrics, currencyList))
                setCountPages(countTenders + 1)
            }
            else if (application === applicationValues.SELL && saleTendersAPI && countSaleTenders !== undefined) {
                setTenderList(tenderAPIListToTenderList(saleTendersAPI, metrics, currencyList, ETenderTypeEn.SALE))
                setCountPages(countSaleTenders + 1)
            }
            else if (application === applicationValues.PURCHASE && purchaseTendersAPI && countPurchaseTenders !== undefined) {
                setTenderList(tenderAPIListToTenderList(purchaseTendersAPI, metrics, currencyList, ETenderTypeEn.PURCHASE))
                setCountPages(countPurchaseTenders + 1)
            }
        }
        
    }, [allTendersAPI, saleTendersAPI, purchaseTendersAPI, application, countTenders, countSaleTenders, countPurchaseTenders])

    useEffect(() => {
        const fetchFavorites = async () => {
            if (tenderList.length === 0)
                return
            
            const saleTenderIds: number[] = [];
            const purchaseTenderIds: number[] = [];
    
            // Разбиваем тендеры на два массива: продажа и покупка
            tenderList.forEach(it => {
                if (it.type === ETenderTypeEn.SALE) {
                    saleTenderIds.push(it.id);
                } else if (it.type === ETenderTypeEn.PURCHASE) {
                    purchaseTenderIds.push(it.id);
                }
            });
    
            try {
                // Выполняем запросы параллельно
                const [saleResponse, purchaseResponse] = await Promise.all([
                    saleTenderIds.length > 0
                        ? areInFavorites({
                              objectIds: saleTenderIds,
                              objectType: FavouriteType.TenderSale
                          }).unwrap()
                        : Promise.resolve({} as Record<string, boolean>), // Если массив пустой, возвращаем пустой объект
                    purchaseTenderIds.length > 0
                        ? areInFavorites({
                              objectIds: purchaseTenderIds,
                              objectType: FavouriteType.TenderPurchase
                          }).unwrap()
                        : Promise.resolve({} as Record<string, boolean>) // Если массив пустой, возвращаем пустой объект
                ]);
    
                // Обновляем список тендеров одним вызовом setTenderList
                setTenderList(prevTenderList =>
                    prevTenderList.map(it => {
                        if (it.type === ETenderTypeEn.SALE) {
                            return { ...it, isFavorite: saleResponse[`${it.id}`] ?? false };
                        } else if (it.type === ETenderTypeEn.PURCHASE) {
                            return { ...it, isFavorite: purchaseResponse[`${it.id}`] ?? false };
                        }
                        return it;
                    })
                );
            } catch (error) {
                console.error("Error fetching favorite tenders:", error);
            }
        };
    
        fetchFavorites();
    }, [tenderList, areInFavorites, setTenderList]);
    

    // set count tenders
    useEffect(() => {
        let amount = 0
        let view = EPTC.TENDER
        if (!isCountAllTendersLoading && countAllTenders !== undefined && (application === null || application === applicationValues.DEFAULT)) {
            amount = countAllTenders
        }
        if (!isCountAllSaleTendersLoading && countAllSaleTenders !== undefined && application === applicationValues.SELL) {
            amount = countAllSaleTenders
        }
        if (!isCountAllPurchaseTendersLoading && countAllPurchaseTenders !== undefined && application === applicationValues.PURCHASE) {
            amount = countAllPurchaseTenders
        }        

        dispatch(PTCSlice.actions.setPTC({amount, view,}), {refetchOnMountOrArgChange: true});
    }, [dispatch, application, isCountAllTendersLoading, countAllTenders, isCountAllSaleTendersLoading, countAllSaleTenders, isCountAllPurchaseTendersLoading, countAllPurchaseTenders])


    if (conditionAllTenders || conditionSaleTenders || conditionPurchaseTenders)
        return <Loader />

    return (
        <WrapperSortFilter variant={ECatalogVariants.TENDERS} pageNumberKey={TENDER_PARAMS.NUMBER_PAGE__KEY}>
            <WrapperPagination amount={countPages} 
                                active={pageNumber} keyPageParam={TENDER_PARAMS.NUMBER_PAGE__KEY} 
                                set={setPageNumber}>
                
                <WrapperDefaultTenderNotFound showDefault={tenderList.length === 0} className={cl.TenderList}>
                    {tenderList.map(it => (
                        <TenderItem item={it} key={it.id} />
                    ))}
                </WrapperDefaultTenderNotFound>
            </WrapperPagination>
        </WrapperSortFilter>
    )
}