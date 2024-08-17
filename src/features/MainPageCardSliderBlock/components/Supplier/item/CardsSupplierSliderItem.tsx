import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { SupplierItem } from "@/entities/Supplier/ui/Item/SupplierItem"
import { IListItem } from "@/shared/model/list.model"

interface ICardsSupplierSliderItem extends IListItem<ISupplier> {}

export const CardsSupplierSliderItem = ({
    item: supplier,
    className,
    classNameSupplierWNav,
    classNameBaseSupplier
}: ICardsSupplierSliderItem) => {
    return (
        <SupplierItem supplier={supplier}
            className={className}
            classNameSupplierWNav={classNameSupplierWNav}
            classNameBaseSupplier={classNameBaseSupplier}
        />
    )
}
