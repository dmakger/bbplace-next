"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSlider.module.scss'
import { Slider } from "@/features/Slider/ui/Slider";
import { ISlider } from "@/features/Slider/model/slider.model";
import { ImageSlide } from "../item/ImageSlide";

interface ImageSliderProps extends ISlider{
    slides?: string[]
}

export const ImageSlider:FC<ImageSliderProps> = ({className, ...rest}) => {
    return (
        <Slider component={ImageSlide} 
                className={cls(cl.slider, className)} 
                {...rest}/>
    )
}
