'use client'

import { FC, useState, useEffect } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKTenderTableAdaptive.module.scss'
import { ETenderType, ITender } from "../../model/tender.model";
import { TenderLKList } from "../LK/List/TenderLKList";
import { LKTenderTable } from "@/features/Table/ui/Tender/LK/ui/LKTenderTable";


import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import { useAppSelector } from "@/storage/hooks";
import { useParams } from "next/navigation";
import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";


interface LKTenderTableAdaptiveProps{
    // tenderType: ETenderType
    tenderType?: ETenderType
    className?: string,
}

export const LKTenderTableAdaptive:FC<LKTenderTableAdaptiveProps> = ({tenderType, className}) => {
    // PARAMS
    const params = useParams()
    const tenderTypeSuccess = tenderType ? tenderType : toTenderType(params.type as string) as ETenderType

    // STATE
    const [is768, setIs768] = useState(false)
    const [tenders, setTenders] = useState<ITender[]>([])
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    
    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // API
    const { data: tendersAPI, isLoading: isTendersLoading } = TenderAPI.useGetUserTendersQuery(userId ? { userId, type: tenderTypeSuccess } : skipToken);
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [getCategory] = CategoryAPI.useGetCategoryMutation();

    // ======={ EFFECT }=======
    
    // SET CATEGORIES
    useEffect(() => {
        if (!tendersAPI) return;

        const fetchCategories = async () => {
            try {
                const categories = await Promise.all(
                    tendersAPI.map(async (it) => {
                        const categoryResponse = await getCategory(it.categoryId).unwrap();
                        return categoryResponse[0]; // Assuming the response is an array and we need the first element
                    })
                );
                setCategoryList(categories);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, [tendersAPI, getCategory]);

    // SET TENDERS
    useEffect(() => {
        if (tendersAPI && metrics && currencyList && categoryList) {
            setTenders(() => {
                return tendersAPI.map((it, index) => (
                    { ...tenderAPIToTender({ tenderAPI: it, metrics, currencyList }), category: categoryList[index] }
                ))
            })
        }
    }, [tendersAPI, metrics, currencyList, categoryList])
    
    return (
        <>
            {is768 ? (
                <TenderLKList items={tenders} className={cl.list} />
            ) : (
                <LKTenderTable tenderType={tenderType} />
            )}
            <HandleSize set={setIs768} width={768} />
        </>
    )
}
