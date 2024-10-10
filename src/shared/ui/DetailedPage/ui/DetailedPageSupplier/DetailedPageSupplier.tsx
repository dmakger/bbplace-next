'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageSupplier.module.scss'
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierView } from "@/entities/Supplier/data/supplier.data"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { EHeadingToTextVariants, IGetDataHeadingToTextSupplierTableVariant } from "@/shared/model/text.model"
import { getDataHeadingToTextSupplierTable } from "@/shared/ui/Text/lib/htt.supplier.lib"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { NavSupplier } from "@/entities/Supplier/components/Nav/NavSupplier"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonSize } from "@/shared/ui/Button/model/button.model"
import { useState } from "react"
import { ARROW_PRIMARY_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon"

interface ISupplierCard {
    className?: string,
    id: string,
    supplier: ISupplier,
    supplierReviews: number,
    supplierRating: number
    classNameVerified?: string

}

export const DetailedPageSupplier = ({
    className,
    classNameVerified,
    id,
    supplier,
    supplierReviews,
    supplierRating
}: ISupplierCard) => {

    if (!supplier) return;

    //STATE
    const [isMoreInfoOpen, setIsMoreInfoOpen] = useState<boolean>(false);

    return (
        <section className={cls(cl.DetailedPageSupplier, cl['demo'], className)} id="supplier">
            <div className={cl.innerContainer}>
                <div className={cl.topContainer}>
                    <SupplierWNav
                        id={id}
                        hasImage
                        view={ESupplierView.LARGE_WHITE_FOR_DESCRIPTION_PAGE}
                        imageSizes={{ width: 100, height: 100 }}
                        classNameVerified={classNameVerified}
                    />
                </div>
                <div className={cl.infoContainer}>
                    {/* <NavSupplier supplierId={supplier.id}
                            className={cl.navSupplier}
                            views={[
                                ESupplierToProfileViewItem.LARGE,
                                ESupplierToChatViewItem.LARGE_WIDE,
                                ESupplierSubscribeViewItem.LARGE_OUTLINE]}
                        /> */}
                    <HeadingToTextTable data={getDataHeadingToTextSupplierTable({
                        variant: IGetDataHeadingToTextSupplierTableVariant.PRODUCT_PAGE,
                        supplier,
                        supplierRating,
                        supplierReviews,
                        isCountryNeeded: true
                    })}
                        variant={EHeadingToTextVariants.ROW}
                        hasSpace={false}
                        classNameMainBlock={cl.tableMainBlock}
                        classNameRow={cl.mainBlockRow}
                        classNameHeadingItem={cl.headingItem}
                        classNameTextItem={cl.textItem}
                    />
                </div>
                <Button title={isMoreInfoOpen ? 'Меньше информации' : 'Больше информации'}
                    variant={ButtonVariant.TONAL}
                    size={ButtonSize.Medium}
                    className={cl.buttonMoreInfo}
                    afterImage={ARROW_PRIMARY_WO_ICON}
                    afterProps={{ className: cls(cl.arrow, isMoreInfoOpen ? cl.arrowOpen : '') }}
                    onClick={() => setIsMoreInfoOpen(!isMoreInfoOpen)} />
            </div>
        </section>
    )
}
