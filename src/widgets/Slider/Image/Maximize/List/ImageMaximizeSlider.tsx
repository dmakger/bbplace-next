"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlider.module.scss'
import { Slider } from "@/features/Slider/ui/Slider";
import { ISlider } from "@/features/Slider/model/slider.model";
import { ImageMaximizeSlide } from "../Item/ImageMaximizeSlide";
import { Modal } from "@/shared/ui/Modal/Modal";
import { EModalView } from "@/shared/data/modal.data";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";

interface ImageMaximizeSliderProps extends ISlider{
    hasMaximize?: boolean
    isFullWindow?: boolean
    slides?: string[]
}

export const ImageMaximizeSlider:FC<ImageMaximizeSliderProps> = ({hasMaximize=false, isFullWindow=false, slides, className, ...rest}) => {
    // VARS
    const slideProps: ISlider['slideProps'] = {isFullWindow}
    
    // STATE
    const [isOpen, setIsOpen] = useState(false);

    // HANDLE
    const handleOnClickMaximize = () => {
        setIsOpen(prevState => !prevState)
    }

    // HTML
    const sliderHTML = (
        <Slider slides={slides} component={ImageMaximizeSlide} 
                className={cls(cl.slider, isOpen || isFullWindow ? cl.fullWindow : '', className)} 
                slideProps={hasMaximize ? {...slideProps, onClickMaximize: handleOnClickMaximize} : slideProps}
                {...rest}/>
    )
    if (!hasMaximize)
        return sliderHTML

    return (
        <>
            {sliderHTML}
            <Modal _isOpen={isOpen}
                    onClickOverlay={handleOnClickMaximize}
                    view={EModalView.RIGHT} hasClose={true} buttonNode={undefined}>
                <CatalogImage imageList={slides} isFullWindow={isOpen} className={isOpen || isFullWindow ? cl.fullWindow : ''}/>
            </Modal>
        </>
    )
}
