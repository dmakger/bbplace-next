'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderItem.module.scss'
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
import { CreatedAt } from "@/shared/ui/CreatedAt"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { FavouriteSmallToSupplierButton } from "@/entities/Supplier/components/Button/Favourite/Small/FavouriteSmallToSupplierButton"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ESupplierView } from "@/entities/Supplier/data/supplier.data"

interface ITenderItem {
    tender: ICommonTender
    className?: string
}

export const TenderItem = ({
    tender,
    tender: { id, categoryId, ownerId, createdAt },
    className,
}: ITenderItem) => {

    //STATE
    const [tenderCategory, setTenderCategory] = useState<ICategory>()
    const [tenderType, setTenderType] = useState<ETenderType>()
    const [is768, setIs768] = useState<boolean>(false);

    //API
    const { data: categories } = CategoryAPI.useGetCategoriesQuery()

    //EFFECT
    useEffect(() => {
        categories && setTenderCategory(categories.find(category => category.id === categoryId))
    }, [categories])

    useEffect(() => {
        setTenderType(getTenderType(tender))
    }, [tender])

    //NAVIGATE
    const { push } = useRouter()

    const goToTheTender = () => {
        if (is768) {
            push(`lead/${id}?type=${tenderType === ETenderType.PURCHASE ? 'purchase' : 'sale'}`);
        }
    };

    const handleInfoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    

    return (
        <>
            <section className={cls(cl.TenderCard, className)} onClick={goToTheTender}>
                <div className={cl.topContainer} onClick={handleInfoClick}>
                    <div className={cl.info}>
                        {tenderType && <TenderType tenderType={tenderType} />}
                        {tenderCategory && <CategoryItem category={tenderCategory} />}
                    </div>
                    <FavouriteSmallToSupplierButton />
                </div>

                <div className={cl.middleContainer} >
                    <span className={cl.cardTitle}>
                        {tender.name}
                    </span>
                    <TenderInfo data={getDataTenderInfo(tender)} />
                </div>

                <div className={cl.bottomContainer}>
                    <div className={cl.supplierBlock} onClick={handleInfoClick}>
                        <SupplierWNav
                            className={cl.supplier}
                            classNameSmallSupplier={cl.smallSupplier}
                            id={ownerId}
                            view={is768 ? ESupplierView.SMALL : ESupplierView.LARGE_GRAY}
                            subscribeView={ESupplierSubscribeViewItem.SMALL}
                            navs={[
                                is768 ? ESupplierToChatViewItem.LARGE : ESupplierToChatViewItem.LARGE_WIDE,
                            ]} />
                    </div>
                    <CreatedAt createdAt={createdAt} />
                    <div className={cl.buttonToTender} onClick={handleInfoClick}>
                        <Button
                            variant={ButtonVariant.W_ARROW_RED}
                            onClick={goToTheTender}>
                            В тендер
                        </Button>
                    </div>
                </div>
            </section>
            <HandleSize width={768} set={setIs768} />
        </>
    )
}
