import { FC } from "react"

import { ISliderTTop } from "@/shared/model/sliderT.model";
import { SliderT } from "@/shared/ui/SliderT/SliderT";
import { ImageControlSliderItem } from "./Item/ImageControlSliderItem";


interface ImageControlSliderProps extends ISliderTTop<string>{}

export const ImageControlSlider:FC<ImageControlSliderProps> = ({...rest}) => {
    return (
        <SliderT component={ImageControlSliderItem} 
                 {...rest}/>
    )
}
