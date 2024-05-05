'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_SupplierPageHeader.module.scss'
import { SupplierWNav } from "../../ui/WNav/SupplierWNav"
import { ESupplierView } from "../../data/supplier.data"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { ISupplier } from "../../model/supplier.model"
import { ISellerReview } from "@/entities/Review/model/review.model"
import { getDataHeadingToTextSupplierTable } from "../../lib/htt.supplier.lib"
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI"
import { NavSupplier } from "../Nav/NavSupplier"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "../../data/view.supplier.data"

interface ISupplierPageHeader {
    className?: string,
    supplier: ISupplier,
    supplierScore: number,
    supplierReviews: ISellerReview[]
}

export const SupplierPageHeader = ({
    className,
    supplier,
    supplierScore,
    supplierReviews
}: ISupplierPageHeader) => {
    return (
        <section className={cls(cl.SupplierPageHeader, className)}>
            <ImageAPI src={supplier.photoId ? supplier.photoId.key : ''} alt={supplier.photoId ? supplier.photoId.name : ''} className={cl.image} width={175} height={175} />

            <div className={cl.rightContainer}>
                <SupplierWNav id={supplier.id} view={ESupplierView.LARGE_WHITE} classNameName={cl.supplierName} />
                <HeadingToTextTable data={getDataHeadingToTextSupplierTable(supplier, supplierScore, supplierReviews.length, false)}
                    className={cl.table}
                    classNameHeadingItem={cl.headingItem}
                    classNameColumn={cl.columnTable} />
                <NavSupplier supplierId={supplier.id} views={[
                    ESupplierSubscribeViewItem.LARGE,
                    ESupplierToChatViewItem.LARGE_WIDE
                ]} />
            </div>
        </section>
    )
}
