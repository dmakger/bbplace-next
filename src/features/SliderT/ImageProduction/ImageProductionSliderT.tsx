import { FC } from "react"

import { ISliderTTop } from "@/shared/model/sliderT.model";
import { SliderT } from "@/shared/ui/SliderT/SliderT";
import { ImageProductionSliderTItem } from "./Item/ImageProductionSliderTItem";

interface ImageProductionSliderTProps extends ISliderTTop<string>{}

export const ImageProductionSliderT:FC<ImageProductionSliderTProps> = ({...rest}) => {
    return (
        <SliderT component={ImageProductionSliderTItem} 
                 {...rest}/>
    )
}
