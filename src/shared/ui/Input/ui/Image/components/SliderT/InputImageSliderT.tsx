import { FC } from "react"

import { SliderT } from "@/shared/ui/SliderT/SliderT";
import { ISliderTTop } from "@/shared/model/sliderT.model";
import { InputImageSliderTItem } from "./Item/InputImageSliderTItem";

interface InputImageSliderTProps extends ISliderTTop<string>{}

export const InputImageSliderT:FC<InputImageSliderTProps> = ({...rest}) => {
    return (
        <SliderT component={InputImageSliderTItem} 
                 {...rest}/>
    )
}
