import { ISliderTTop } from "@/shared/model/sliderT.model"
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { CardsSupplierSliderItem } from "./item/CardsSupplierSliderItem"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"

interface ICardsSupplierSlider extends ISliderTTop<ISupplier> {
    className?: string,
    classNameSupplierWNav?: string,
    classNameBaseSupplier?: string
}

export const CardsSupplierSlider = ({
    classNameSupplierWNav,
    classNameBaseSupplier,
    ...rest
}: ICardsSupplierSlider) => {
    return (
        <SliderT component={CardsSupplierSliderItem}
            componentProps={{
                classNameSupplierWNav: classNameSupplierWNav,
                classNameBaseSupplier: classNameBaseSupplier
            }}
            {...rest}
        />
    )
}
