'use client'

import { FC, useState, useEffect } from "react"

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
import { useAppSelector } from "@/storage/hooks";
import { useParams } from "next/navigation";
import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { EModalView } from "@/shared/data/modal.data";
import { EInputTextType } from "@/shared/ui/Input/ui/Text/data/text.input.data";
import { ModalAction } from "@/shared/ui/Modal/ui/Action/ModalAction";
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model";


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
    const [showModal, setShowModal] = useState<boolean>(false)
    const [tenderForDeleting, setTenderForDeleting] = useState<ITender | undefined>()
    const [tenderTypeForDeleting, setTenderTypeForDeleting] = useState<ETenderType | undefined>()
    
    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // API
    const { data: tendersAPI, isLoading: isTendersLoading } = TenderAPI.useGetUserTendersQuery(userId ? { userId, type: tenderTypeSuccess } : skipToken);
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const [deleteTender] = TenderAPI.useDeleteTenderMutation()

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


    // ======={ HANDLE }=======
    const onClickDelete = (tender: ITender, type?: ETenderType) => {
        if (type === undefined || tenders === undefined) return
        setTenderForDeleting(tender)
        setTenderTypeForDeleting(type)
        setShowModal(true)
    }

    const deleteSelectedTender = async () => {
        if (!tenderForDeleting || !tenderTypeForDeleting) 
            return
        await deleteTender({tenderId: tenderForDeleting.id, type: tenderTypeForDeleting}).unwrap()
            .then(() => {                
                setTenders(prevTenders => prevTenders.filter(it => it.id !== tenderForDeleting.id))
                cancelDeleting()
            })
    }

    const cancelDeleting = () => {
        setShowModal(false)
        setTenderForDeleting(undefined)
        setTenderTypeForDeleting(undefined)
    }
    
    return (
        <>
            {is768 ? (
                <TenderLKList items={tenders} onClickDelete={onClickDelete} className={cl.list} />
            ) : (
                <LKTenderTable tenderType={tenderType} defaultTenders={tenders} onClickDeleteTender={onClickDelete}/>
            )}
            <HandleSize set={setIs768} width={768} />
            <ModalAction 
                isOpen={showModal} view={EModalView.CENTER}
                title={"Удаление тендера"}
                text={[`Тендер ${tenderForDeleting ? `«${tenderForDeleting?.name}»` : ""} будет удалён без возможности восстановления.`]}
                buttonSecond={{
                    variant: ButtonVariant.BORDER,
                    color: ButtonColor.Tertiary,
                    size: ButtonSize.Big,
                    title: 'Отмена',
                    onClick: cancelDeleting
                }} 
                buttonFirst={{
                    variant: ButtonVariant.TONAL,
                    color: ButtonColor.Negative,
                    size: ButtonSize.Big,
                    title: 'Удалить',
                    onClick: deleteSelectedTender
                }} 
                />
        </>
    )
}
