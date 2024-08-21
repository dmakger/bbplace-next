'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_SupplierPageHeader.module.scss'
import { SupplierWNav } from "../../ui/WNav/SupplierWNav"
import { ESupplierView } from "../../data/supplier.data"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { ISupplier } from "../../model/supplier.model"
import { getDataHeadingToTextSupplierTable } from "../../../../shared/ui/Text/lib/htt.supplier.lib"
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI"
import { NavSupplier } from "../Nav/NavSupplier"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "../../data/view.supplier.data"
import { EHeadingToTextVariants } from "@/shared/model/text.model"

interface ISupplierPageHeader {
    className?: string,
    supplier: ISupplier,
    supplierRating: number,
    supplierReviews: number,
    classNameSupplierWNav?: string
}

export const SupplierPageHeader = ({
    className,
    supplier,
    supplierRating,
    supplierReviews,
    classNameSupplierWNav
}: ISupplierPageHeader) => {
    return (
        <section className={cls(cl.SupplierPageHeader, className)}>
            <ImageAPI src={supplier.photoId ? supplier.photoId.key : ''} alt={supplier.photoId ? supplier.photoId.name : ''} className={cl.image} width={175} height={175} />

            <div className={cl.rightContainer}>
                <SupplierWNav id={supplier.id} view={ESupplierView.LARGE_WHITE} classNameName={cl.supplierName} classNameSupplier={cl.supplier} className={cl.baseSupplier}/>
                <HeadingToTextTable variant={EHeadingToTextVariants.COLUMN} data={getDataHeadingToTextSupplierTable({
                    supplier,
                    supplierRating,
                    supplierReviews
                })}
                classNameColumn={cl.mainColumn}
                    classNameHeadingItem={cl.headingItem}
                    classNameTextItem={cl.textItem}
                />
                <NavSupplier supplierId={supplier.id} views={[
                    ESupplierSubscribeViewItem.LARGE,
                    ESupplierToChatViewItem.LARGE_WIDE
                ]} />
            </div>
        </section>
    )
}
