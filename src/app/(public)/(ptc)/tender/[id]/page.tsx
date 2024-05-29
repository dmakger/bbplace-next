'use client'

import cl from './_TenderDetailedPage.module.scss'
import { useEffect, useMemo, useState } from "react";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from '@/entities/Supplier/data/view.supplier.data';
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { SWITCH_SELECTOR_TENDER_OPTIONS } from "@/entities/Tender/data/tender.data";
import { getTenderWholesalePrices, tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "@/entities/Tender/model/tender.model";
import { DetailedPageHeader } from "@/features/DetailedPageHeader";
import { DetailedPageInfo } from "@/features/DetailedPageInfo";
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ScrollSlider } from "@/features/ScrollSlider";
import { DetailedPageDescription } from "@/shared/ui/DetailedPage";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector";
import { getDataTenderInfo } from '@/shared/ui/Text/lib/htt.tender.lib';
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useParams, useSearchParams } from "next/navigation";
import { ImageSlide } from '@/widgets/Slider/Image/Default/Item/ImageSlide';

export default function TenderPage() {

    //STATE
    const [tender, setTender] = useState<ISaleTender | IPurchaseTender>()
    const [tenderType, setTenderType] = useState<ETenderType>(ETenderType.PURCHASE)
    const [is768, setIs768] = useState<boolean>(false)

    //PARAMS
    const params = useParams()
    const tenderId = params.id as string
    const searchParams = useSearchParams()

    //API
    const { data: purchaseTenderApi } = TenderAPI.useGetPurchaseTenderByIdQuery(Number(tenderId));
    const { data: saleTenderApi } = TenderAPI.useGetSaleTenderByIdQuery(Number(tenderId));
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()

    //EFFECT
    useEffect(() => {
        setTenderType(searchParams.get('type') === 'sale' ? ETenderType.SALE : ETenderType.PURCHASE)
    }, [searchParams])

    useEffect(() => {
        if (metrics && currencyList) {
            if (tenderType === ETenderType.PURCHASE && purchaseTenderApi) {
                setTender((tenderAPIToTender({ tenderAPI: purchaseTenderApi, metrics, currencyList })));
            }
            else if (saleTenderApi) {
                setTender((tenderAPIToTender({ tenderAPI: saleTenderApi, metrics, currencyList })));
            }
        }
    }, [purchaseTenderApi, saleTenderApi])

    //MEMO
    const wholesalePrices = useMemo(() => {
        if (tender) {
            return [getTenderWholesalePrices(tender, tenderType)];
        } else {
            return [];
        }
    }, [tender, tenderType]);

    
    if(!tender) return;

    const images = tender.attachments.map((it: ITenderAttachments) => it.key);

    //OPTIONS
    const TENDER_PAGE_OPTIONS_TABLE: IOptionsTab = {
        description: { optionTab: <DetailedPageDescription description={tender.description} /> }
    }

    return (
        <Wrapper1280>
                <section className={cl.TenderDetailedPage}>
                    <DetailedPageHeader
                        id={tender.id}
                        type={tenderType}
                        name={tender.name}
                        tableData={getDataTenderInfo(tender, true)}
                        wholesalePrices={wholesalePrices}
                        isRightContainer
                        supplierId={tender.ownerId}
                    />

                    <SupplierWNav
                        className={cl.supplierBlock}
                        classNameNavs={cl.navSupplier}
                        id={tender.ownerId}
                        hasImage
                        navs={[
                            ESupplierSubscribeViewItem.LARGE_OUTLINE,
                            is768 ? ESupplierToChatViewItem.SMALL_WIDE : ESupplierToChatViewItem.NONE
                        ]}
                    />
                    
                    {images.length > 1 && (
                        <ScrollSlider
                            className={cl.slider}
                            component={ImageSlide}
                            width={150}
                            height={150}
                            slides={images}
                            classNameSlides={cl.imageSlide}
                        />
                    )}

                    <DetailedPageInfo
                        options={SWITCH_SELECTOR_TENDER_OPTIONS}
                        defaultOption={SWITCH_SELECTOR_DESCRIPTION_OPTION}
                        optionsTab={TENDER_PAGE_OPTIONS_TABLE}
                    />
                </section>
            <HandleSize width={768} set={setIs768} />
        </Wrapper1280>
    )
}
