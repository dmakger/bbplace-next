import { ISliderTTop } from "@/shared/model/sliderT.model"
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { CardsSupplierSliderItem } from "./item/CardsSupplierSliderItem"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"

interface ICardsSupplierSlider extends ISliderTTop<ISupplier>{
    className?: string
}

export const CardsSupplierSlider = ({...rest}: ICardsSupplierSlider) => {
    return (
        <SliderT component={CardsSupplierSliderItem} {...rest}/>
    )
}
