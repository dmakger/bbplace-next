'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderCard.module.scss'
import { FavouriteIcon, FavouriteIconVariant } from "@/shared/ui/Icon"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import CategoryItem from "@/entities/Metrics/ui/Category/Item/CategoryItem"
import { TenderType } from "../../components/TenderType/TenderType"
import { ETenderType, ICommonTender } from "../../model/tender.model"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { getTenderType } from "../../lib/tender.lib"
import { TenderInfo, getDataTenderInfo } from "@/shared/ui/TenderInfo"
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { SupplierDefault } from "@/entities/Supplier/ui/Default/SupplierDefault"
import { CreatedAt } from "@/shared/ui/CreatedAt"

interface ITenderItem{
    tender: ICommonTender
    className?: string
}

export const TenderItem= ({
    tender,
    tender: {id, categoryId, ownerId, createdAt},
    className,
}: ITenderItem ) => {

    //STATE
    const [tenderCategory, setTenderCategory] = useState<ICategory>()
    const [tenderType, setTenderType] = useState<ETenderType>()

    //API
    const {data: categories} = CategoryAPI.useGetCategoriesQuery()
    const {data: supplierInfo} = UserAPI.useGetUserDataQuery(ownerId)

    //EFFECT
    useEffect(() => {
        categories && setTenderCategory(categories.find(category => category.id === categoryId))
    }, [categories])

    useEffect(() => {
      setTenderType(getTenderType(tender))
    }, [tender])
    
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
                    {tender.name}
                </span>
                <TenderInfo data={getDataTenderInfo(tender)} />
                <p className={cl.cardSupplier}>{supplierInfo?.brandName}</p>
            </div>
            
            <div className={cl.bottomContainer}>
                <div className={cl.supplierBlock}>
                    <SupplierDefault 
                        id={supplierInfo ? supplierInfo.id : ''}
                        className={cl.TenderCardInfo}
                        />
                    <div className={cl.desktop}>
                        <Button variant={ButtonVariant.BORDERED_RED_WIDE} onClick={goToTheChatWSupplier}>
                            Связаться с поставщиком
                        </Button>
                    </div>
                    <CreatedAt createdAt={createdAt}/>
                </div>
                <div className={cl.desktop}>
                    <Button variant={ButtonVariant.W_ARROW_RED} onClick={() => goToTheTender(id)}>
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
