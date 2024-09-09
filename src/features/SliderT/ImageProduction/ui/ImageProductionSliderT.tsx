import { FC } from "react"

import { ISliderTTop } from "@/shared/model/sliderT.model";
import { SliderT } from "@/shared/ui/SliderT/SliderT";
import { InputImageSliderTItem } from "@/shared/ui/Input/ui/Image/components/SliderT/Item/InputImageSliderTItem";

interface ImageProductionSliderTProps extends ISliderTTop<string>{}

export const ImageProductionSliderT:FC<ImageProductionSliderTProps> = ({...rest}) => {
    return (
        <SliderT component={InputImageSliderTItem} 
                 {...rest}/>
    )
}
