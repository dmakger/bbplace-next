'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderCard.module.scss'
import { FavouriteIcon, FavouriteIconVariant } from "@/shared/ui/Icon"
import { SupplierInfo } from "@/shared/ui/SupplierInfo"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import CategoryItem from "@/entities/Metrics/ui/Category/Item/CategoryItem"
import { TenderType } from "./TenderType/TenderType"
import { ETenderType, ITenderCard } from "../model/tender.model"
import { useRouter } from "next/navigation"
import { useCategoryAll } from "@/entities/Metrics/hooks/useCategory.hooks"
import { useEffect, useState } from "react"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { getFormattedDate, getTenderType } from "../lib/tender.lib"
import { TenderInfo, getDataTenderInfo } from "@/shared/ui/TenderInfo"


export const TenderCard = ({
    tender,
    className,
}: ITenderCard ) => {

    //STATE
    const [tenderCategory, setTenderCategory] = useState<ICategory>()
    const [tenderType, setTenderType] = useState<ETenderType>()

    //API
    const {data: categories} = useCategoryAll()

    //EFFECT
    useEffect(() => {
        categories && setTenderCategory(categories.find(category => category.id === tender.categoryId))
    }, [categories])

    useEffect(() => {
      setTenderType(getTenderType(tender))
    }, [])
    


    //NAVIGATE
    const {push} = useRouter()

    const goToTheChatWSupplier = () => {

    }

    const goToTheTender = (tenderId: number) => {
       
    }

    return (
        <section className={cls(cl.TenderCard, className)}>
            <div className={cl.topContainer}>
                <div className={cl.info}>
                    {tenderType && <TenderType tenderType={tenderType}/>}
                    {tenderCategory && <CategoryItem category={tenderCategory}/>}
                </div>
                <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART}/>
            </div>
            <div className={cl.middleContainer}>
                <span className={cl.cardTitle}>
                    {tender.name || 'Самоклеящаяся бумага для цифровой печати'}
                </span>
                <TenderInfo data={getDataTenderInfo(tender)} />
            </div>
            <div className={cl.bottomContainer}>
                <div className={cl.supplierBlock}>
                    <SupplierInfo />
                    <div className={cl.desktop}>
                        <Button variant={ButtonVariant.BORDERED_RED_WIDE} onClick={goToTheChatWSupplier}>
                            Связаться с поставщиком
                        </Button>
                    </div>
                    <p className={cl.createdAt}>
                        {getFormattedDate(tender.createdAt)}
                    </p>
                </div>
                <div className={cl.desktop}>
                    <Button variant={ButtonVariant.W_ARROW_RED} onClick={() => goToTheTender(tender.id)}>
                        В тендер
                    </Button>
                </div>
                <div className={cl.mobileBottom}>
                    <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART} classNameIcon={cl.inCircleHeartTender}/>
                    <Button variant={ButtonVariant.BORDERED_RED_NARROW} onClick={goToTheChatWSupplier}>
                            Написать
                    </Button>
                </div>
            </div>
        </section>
    )
}
