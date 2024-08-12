"use client"

import { FC, useState } from "react"

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
    classNameSlide?: string
}

export const ImageMaximizeSlider:FC<ImageMaximizeSliderProps> = ({
    hasMaximize=false, isFullWindow=false, 
    slides=[], 
    className, classNameSlide, 
    ...rest
}) => {
    // VARS
    const slideProps: ISlider['slideProps'] = {isFullWindow, classNameSlide}
    
    // STATE
    const [isOpen, setIsOpen] = useState(false);

    // HANDLE
    const handleOnClickMaximize = () => {
        setIsOpen(prevState => !prevState)
    }

    // HTML
    const sliderHTML = (
        <div className={cls(cl.wrapper, isOpen || isFullWindow ? cl.fullWrapper : '')}>
            <Slider slides={slides} component={ImageMaximizeSlide} 
                    className={cls(cl.slider, isOpen || isFullWindow ? cl.fullWindow : '', className)} 
                    slideProps={hasMaximize ? {...slideProps, onClickMaximize: handleOnClickMaximize} : {...slideProps}}
                    {...rest}/>
            {rest.activeIndex !== undefined && slides !== undefined &&
                <div className={cl.hint}>
                    <span className={cl.current}>{rest.activeIndex + 1}</span>
                    /
                    <span className={cl.length}>{slides?.length}</span>
                </div>
            }
        </div>
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
