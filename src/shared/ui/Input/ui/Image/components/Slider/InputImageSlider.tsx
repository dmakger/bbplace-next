import { FC } from "react"

import { Slider } from "@/features/Slider/ui/Slider";
import { InputImageSliderItem } from "./Item/InputImageSliderItem";
import { ISlider, ISliderTopLevel } from "@/features/Slider/model/slider.model";

interface InputImageSliderProps extends ISliderTopLevel<string>{
    className?: string,
}

export const InputImageSlider:FC<InputImageSliderProps> = ({...rest}) => {
    return (
        <Slider component={InputImageSliderItem} {...rest}/>
    )
}
