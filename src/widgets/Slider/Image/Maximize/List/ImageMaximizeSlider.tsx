"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlider.module.scss'
import { ImageMaximizeSlide } from "../Item/ImageMaximizeSlide";
import { Modal } from "@/shared/ui/Modal/ui/Modal/Modal";
import { EModalView } from "@/shared/data/modal.data";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { XMARK__TERTIARY_TO_WHITE__ICON } from "@/shared/ui/Icon/data/xmark.data.icon";
import { ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { ISliderTTop } from "@/shared/model/sliderT.model";
import { SliderT } from "@/shared/ui/SliderT/SliderT";

interface ImageMaximizeSliderProps extends ISliderTTop<string> {
    hasMaximize?: boolean
    isFullWindow?: boolean
}

export const ImageMaximizeSlider:FC<ImageMaximizeSliderProps> = ({
    hasMaximize=false, isFullWindow=false, 
    items,
    className,
    ...rest
}) => {
    // VARS
    // const slideProps: ISlider['slideProps'] = {isFullWindow, classNameSlide}
    
    // STATE
    const [isOpen, setIsOpen] = useState(false);

    // HANDLE
    const handleOnClickMaximize = () => {
        setIsOpen(prevState => !prevState)
    }

    // HTML
    const sliderHTML = (
        <div className={cls(cl.wrapper, isFullWindow ? cl.fullWrapper : '')}>
            <SliderT items={items} isFull={true} gap={0}
                    onClickItem={handleOnClickMaximize}
                    component={ImageMaximizeSlide} className={cls(cl.slider, className)} 
                    classNameItem={cl.sliderItem}
                    componentProps={isFullWindow ? {
                        classNameImage: cl.leftModalBodyItem,
                        hasMaximize: false,
                    } : {hasMaximize: true}}
                    {...rest}/>
            {rest.activeIndex !== undefined &&
                <div className={cl.hint}>
                    <span className={cl.current}>{rest.activeIndex + 1}</span>
                    /
                    <span className={cl.length}>{items?.length}</span>
                </div>
            }
        </div>
    )
    if (!hasMaximize)
        return sliderHTML

    return (
        <>
            {sliderHTML}
            <Modal isOpen={isOpen}
                    onClickOverlay={handleOnClickMaximize}
                    view={EModalView.RIGHT} 
                    hasClose={true} 
                    propsButtonClose={{
                        variant: ButtonVariant.BORDER,
                        size: ButtonSize.Medium,
                        color: ButtonColor.Tertiary,
                        afterImage: XMARK__TERTIARY_TO_WHITE__ICON,
                        className: cl.close,
                    }}
                    buttonNode={undefined}>
                <CatalogImage 
                    imageList={items} isFullWindow={isOpen} hasMaximize={false}
                    className={cls(cl.modalBody, isOpen || isFullWindow ? cl.fullWindow : '')}
                    propsLeftSlider={{
                        items: [],
                        classNameWrapper: cl.leftModalBodyWrapper,
                        classNameSlider: cl.leftModalBodySlider,
                        className: cl.leftModalBody,
                    }}/>
            </Modal>
        </>
    )
}
