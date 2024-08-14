import { ISliderTTop } from "@/shared/model/sliderT.model"
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { ITender } from "@/entities/Tender/model/tender.model"
import { CardsTenderSliderItem } from "./item/CardsTenderSliderItem"

interface ICardsTenderSlider extends ISliderTTop<ITender>{
    className?: string,

}

export const CardsTenderSlider = ({...rest}: ICardsTenderSlider) => {
    return (
        <SliderT component={CardsTenderSliderItem} {...rest}/>
    )
}
