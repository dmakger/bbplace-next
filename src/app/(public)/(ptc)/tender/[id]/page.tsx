'use client'

import { TenderPageMainBlock } from "@/entities/Tender";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { ETenderType, IPurchaseTender, ISaleTender } from "@/entities/Tender/model/tender.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperTenderAdditionalInfo } from "@/shared/ui/Wrapper/TenderAdditionalInfo/ui/WrapperTenderPageAdditionalInfo";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TenderPage() {

    //STATE
    const [tender, setTender] = useState<IPurchaseTender | ISaleTender>()
    const [tenderType, setTenderType] = useState<ETenderType>(ETenderType.PURCHASE)


    //PARAMS
    const params = useParams()
    const tenderId = params.id as string
    const searchParams = useSearchParams()


    //API
    const { data: purchaseTenderApi } = TenderAPI.useGetPurchaseTenderByIdQuery(Number(tenderId));
    const { data: saleTenderApi } = TenderAPI.useGetSaleTenderByIdQuery(Number(tenderId));


    //EFFECT
    useEffect(() => {
        setTenderType(searchParams.get('type') === 'sale' ? ETenderType.SALE : ETenderType.PURCHASE)
    }, [])

    useEffect(() => {
        if (purchaseTenderApi || saleTenderApi) {
            setTender(tenderType === ETenderType.SALE ? saleTenderApi : purchaseTenderApi);
        }
    }, [purchaseTenderApi, saleTenderApi])



    return (
        <Wrapper1280>
            {tender && <WrapperTenderAdditionalInfo tender={tender}>
                 <TenderPageMainBlock
                    tender={tender}
                    tenderType={tenderType} />
            </WrapperTenderAdditionalInfo>}
        </Wrapper1280>
    )
}
