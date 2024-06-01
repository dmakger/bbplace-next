import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageSupplier.module.scss'
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierView } from "@/entities/Supplier/data/supplier.data"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { EHeadingToTextVariants, IGetDataHeadingToTextSupplierTableVariant } from "@/shared/model/text.model"
import { getDataHeadingToTextSupplierTable } from "@/entities/Supplier/lib/htt.supplier.lib"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { NavSupplier } from "@/entities/Supplier/components/Nav/NavSupplier"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "@/entities/Supplier/data/view.supplier.data"

interface IDetailedPageSupplier {
    className?: string,
    id: string,
    supplier: ISupplier,
    supplierReviews: number,
    supplierScore: number
}

export const DetailedPageSupplier = ({
    className,
    id,
    supplier,
    supplierReviews,
    supplierScore
}: IDetailedPageSupplier) => {
    return (
        <div className={cls(cl.DetailedPageSupplier, className)} id="supplier">
            <div className={cl.topContainer}>
                <SupplierWNav 
                    id={id}
                    hasImage
                    view={ESupplierView.LARGE_WHITE_FOR_DESCRIPTION_PAGE}
                    imageSizes={{width: 100, height: 100}} />
            </div>
            <div className={cl.bottomContainer}>
                <div className={cl.bottomLeftContainer}>
                    <NavSupplier supplierId={supplier?.id || ''}
                    className={cl.navSupplier}
                        views={[
                        ESupplierToProfileViewItem.LARGE,
                        ESupplierToChatViewItem.LARGE_WIDE,
                        ESupplierSubscribeViewItem.LARGE_OUTLINE]}
                    />
                </div>
                <div className={cl.bottomRightContainer}>
                    <HeadingToTextTable data={getDataHeadingToTextSupplierTable({variant: IGetDataHeadingToTextSupplierTableVariant.PRODUCT_PAGE,supplier, supplierRating: supplierScore, supplierReviews, isCountryNeeded: true})}
                    classNameMainBlock={cl.tableMainBlock}
                    classNameRow={cl.mainBlockRow}
                    classNameHeadingItem={cl.headingItem}

                     variant={EHeadingToTextVariants.ROW}
                     />
                </div>
            </div>

        </div>
    )
}
