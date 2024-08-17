import { CardsProductSliderItem } from "./item/CardsProductSliderItem"
import { ISliderTTop } from "@/shared/model/sliderT.model"
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { IProduct } from "@/entities/Product/model/product.model"

interface ICardsProductSlider extends ISliderTTop<IProduct>{
    className?: string,
}

export const CardsProductSlider = ({...rest}: ICardsProductSlider) => {
    return (
        <SliderT component={CardsProductSliderItem} {...rest}/>
    )
}
