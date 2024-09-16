'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderItem.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { TenderType } from "../../components/TenderType/TenderType"
import { ETenderType, ICommonTender } from "../../model/tender.model"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { getTenderType } from "../../lib/tender.lib"
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api"
import { CreatedAt } from "@/shared/ui/CreatedAt"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ESupplierView } from "@/entities/Supplier/data/supplier.data"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { EHeadingToTextVariants } from "@/shared/model/text.model"
import { CategoryItem } from "@/entities/Metrics/ui/Category"
import { FavouriteAutoToTenderButton } from "../../components/Buttons/Favourite/Auto/FavouriteAutoToTenderButton"
import { ETenderFavouriteViewItem } from "../../data/view.product.data"
import { ARROW_ICON } from "@/shared/ui/Icon/data/arrow.data.icon"
import { getDataTenderInfo } from "@/shared/ui/Text/lib/htt.tender.lib"
import Link from "next/link"
import { MAIN_PAGES } from "@/config/pages-url.config"

interface ITenderItem {
    tender: ICommonTender,
    classNameLine?: string,
    classNameBlockSupplier?: string,
    className?: string
}

export const TenderItem = ({
    tender,
    classNameLine,
    classNameBlockSupplier,
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

    const goToTheTenderMobile = () => {
        if (is768) {
            push(MAIN_PAGES.CURRENT_TENDER({id: tender.id, type: tender.type}).path);
        }
    };

    const goToTheTenderDesktop = () => {
        push(MAIN_PAGES.CURRENT_TENDER({id: tender.id, type: tender.type}).path);
    };

    const handleInfoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    

    return (
        <>
            <section className={cls(cl.TenderCard, className)} onClick={goToTheTenderMobile}>
                <div className={cl.topContainer} onClick={handleInfoClick}>
                    <div className={cl.info}>
                        {tenderType && <TenderType tenderType={tenderType} />}
                        {tenderCategory && <CategoryItem category={tenderCategory} />}
                    </div>
                    <FavouriteAutoToTenderButton tenderId={tender.id} view={ETenderFavouriteViewItem.SMALL_FILL} tenderType={tender.type ?? ''}/>
                </div>

                <div className={cl.middleContainer} >
                    <Link href={MAIN_PAGES.CURRENT_TENDER({id: tender.id, type: tender.type}).path} className={cl.cardTitle}>
                        {tender.name}
                    </Link>
                    <HeadingToTextTable
                        data={getDataTenderInfo({tender})}
                        variant={EHeadingToTextVariants.ROW}
                        hasSpace={true}
                        classNameMainBlock={cl.TenderInfo}
                        classNameHeadingItem={cl.heading}
                        classNameTextItem={cl.text}
                    />
                </div>

                <div className={cl.bottomContainer}>
                    <div className={cl.supplierBlock} onClick={handleInfoClick}>
                        <SupplierWNav
                            hasVerifiedStatus
                            hasCountry
                            hasImage
                            className={cls(cl.blockSupplier, classNameBlockSupplier)}
                            classNameSupplier={cl.supplier}
                            classNameSmallSupplier={cl.smallSupplier}
                            id={ownerId}
                            view={is768 ? ESupplierView.SMALL : ESupplierView.LARGE_GRAY}
                            subscribeView={ESupplierSubscribeViewItem.SMALL}
                            />
                    </div>
                    <CreatedAt createdAt={createdAt} />
                    <div className={cl.buttonToTender} onClick={handleInfoClick}>
                        <Button variant={ButtonVariant.W_ARROW_RED} onClick={goToTheTenderDesktop}
                                title="В тендер" 
                                afterImage={ARROW_ICON} afterProps={{width: 14, height: 14}} />
                    </div>
                </div>
                <div className={cls(cl.mobileLine, classNameLine)}/>
            </section>
            <HandleSize width={768} set={setIs768} />
        </>
    )
}
