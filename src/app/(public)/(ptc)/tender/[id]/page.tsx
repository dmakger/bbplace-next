'use client'

import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { TenderPageMainBlock } from "@/entities/Tender";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { ETenderType, IPurchaseTender, ISaleTender } from "@/entities/Tender/model/tender.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TenderPage() {

    //STATE
    const [tender, setTender] = useState<ISaleTender | IPurchaseTender>()
    const [tenderType, setTenderType] = useState<ETenderType>(ETenderType.PURCHASE)
    const searchParams = useSearchParams()


    //PARAMS
    const params = useParams()
    const tenderId = params.id as string


    //API
    const { data: purchaseTenderApi } = TenderAPI.useGetPurchaseTenderByIdQuery(Number(tenderId));
    const { data: saleTenderApi } = TenderAPI.useGetSaleTenderByIdQuery(Number(tenderId));
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery()  


    //EFFECT
        useEffect(() => {
            setTenderType(searchParams.get('type') === 'sale' ? ETenderType.SALE : ETenderType.PURCHASE)
        }, [])

    useEffect(() => {
        if (metrics && currencyList) {
            if(tenderType === ETenderType.PURCHASE && purchaseTenderApi){
                setTender((tenderAPIToTender({tenderAPI: purchaseTenderApi, metrics, currencyList})));
            }
            else if(saleTenderApi){
                setTender((tenderAPIToTender({tenderAPI: saleTenderApi, metrics, currencyList})));
            }
        }
    }, [purchaseTenderApi, saleTenderApi])


    return (
        <Wrapper1280>
            {tender && <TenderPageMainBlock
                    tender={tender}
                    tenderType={tenderType} />}
        </Wrapper1280>
    )
}
