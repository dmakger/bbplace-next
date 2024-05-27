"use client"

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlider.module.scss'
import { Slider } from "@/features/Slider/ui/Slider";
import { ISlider } from "@/features/Slider/model/slider.model";
import { ImageMaximizeSlide } from "../Item/ImageMaximizeSlide";

interface ImageMaximizeSliderProps extends ISlider{
    slides?: string[]
}

export const ImageMaximizeSlider:FC<ImageMaximizeSliderProps> = ({className, ...rest}) => {
    return (
        <Slider component={ImageMaximizeSlide} 
                className={cls(cl.slider, className)} 
                // slideProps={{className: ""}}
                {...rest}/>
    )
}
