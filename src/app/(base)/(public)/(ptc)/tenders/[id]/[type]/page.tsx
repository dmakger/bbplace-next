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
import { IDetailedProductOptionsTab, IOptionTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ScrollSlider } from "@/features/ScrollSlider";
import { DetailedPageDescription } from "@/shared/ui/DetailedPage";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector";
import { getDataTenderInfo } from '@/shared/ui/Text/lib/htt.tender.lib';
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useParams } from "next/navigation";
import { ImageSlide } from '@/widgets/Slider/Image/Default/Item/ImageSlide';
import { IFile } from '@/entities/File/model/file.model';
import { FileFormat } from '@/entities/File/data/file.data';
import { filterFilesByFormat } from '@/entities/File/lib/file.lib';
import { FileAPI } from '@/entities/File/api/file.api';
import { IAttachment } from '@/shared/model/attachment.model';
import { FileBlock } from '@/entities/File/ui/Block/FileBlock';
import { tenderTypeToEn, toTenderType } from '@/entities/Tender/lib/tender.lib';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@/storage/hooks';


export default function TenderPage() {

    //PARAMS
    const params = useParams()
    const tenderId = params.id as string
    const tenderTypeParams = toTenderType(params.type as string) as ETenderType

    //STATE
    const [is768, setIs768] = useState<boolean>(false)
    const [is1028, setIs1028] = useState<boolean>(false)
    const [tender, setTender] = useState<ISaleTender | IPurchaseTender>()
    const [images, setImages] = useState<string[]>([])
    const [files, setFiles] = useState<IFile[]>([])

    //API
    // const { data: tenderAPI } = TenderAPI.useGetTenderQuery({tenderId: +tenderId, type: tenderTypeParams as ETenderType});
    const { data: tenderAPI } = TenderAPI.useGetTenderQuery({ tenderId: +tenderId, type: tenderTypeParams });
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [getFile] = FileAPI.useGetFileMutation()

    //RTK
    const {id: userId} = useAppSelector(state => state.user)

    // console.log('tender type', tenderTypeParams, tenderTypeToEn(tenderTypeParams), tender)

    // EFFECT
    useEffect(() => {
        if (tenderAPI && metrics && currencyList) {
            setTender(tenderAPIToTender({ tenderAPI, metrics, currencyList }))
        }
    }, [tenderAPI, metrics, currencyList])

    // useEffect(() => {
    //     const f = () => {
    //         const _tenderType = (tenderTypeParams as string).toLocaleLowerCase()
    //         setTenderType(_tenderType === 'sale' ? ETenderType.SALE : ETenderType.PURCHASE)
    //     }
    //     f()
    // }, [tenderTypeParams])

    useEffect(() => {
        if (!tender) return;

        const filesAsString = tender.attachments.map((it: ITenderAttachments) => it.key);
        setImages(filterFilesByFormat(filesAsString, FileFormat.IMAGE) as string[]);

        const fetchFiles = async () => {
            const _files = filterFilesByFormat((tender.attachments as IAttachment[]), FileFormat.FILE) as IFile[];
            const filePromises = _files.map(async it => {
                if (it.url === undefined) return it;
                const f = await getFile({ fileId: it.url, toFile: true }).unwrap() as IFile;
                return { ...f, name: it.name };
            });

            const fetchedFiles = await Promise.all(filePromises);
            setFiles(fetchedFiles.filter(f => f !== null) as IFile[]);
        };

        fetchFiles();
    }, [tender]);

    //MEMO
    const wholesalePrices = useMemo(() => {
        if (tender) {
            return [getTenderWholesalePrices(tender, tenderTypeParams)];
        }
        return [];
    }, [tender, tenderTypeParams]);

    // console.log('tender qw', wholesalePrices, tenderType)


    if (!tender) return;

    //OPTIONS
    const TENDER_PAGE_OPTIONS_TABLE: IDetailedProductOptionsTab = {
        description: { optionTab: <DetailedPageDescription description={tender.description} /> }
    }

    return (
        <Wrapper1280>
            <section className={cl.TenderDetailedPage}>
                <DetailedPageHeader
                    ownerId={tender.ownerId ?? ''}
                    userId={userId}
                    id={tender.id}
                    type={tenderTypeParams}
                    name={tender.name}
                    tableData={getDataTenderInfo({ tender, isCreatedAt: true })}
                    wholesalePrices={wholesalePrices}
                    isRightContainer
                    supplierId={tender.ownerId}
                />
                <div className={cl.wrapper}>
                    <div className={cl.left}>
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
                    </div>
                    <div className={cl.right}>
                        {files.length > 0 && (
                            <FileBlock files={files} isRow={is1028} className={cl.files} />
                        )}
                    </div>
                </div>
            </section>
            <HandleSize width={768} set={setIs768} />
            <HandleSize width={1028} set={setIs1028} />
        </Wrapper1280>
    )
}
