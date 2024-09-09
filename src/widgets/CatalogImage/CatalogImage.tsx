"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageMaximizeSlider } from "../Slider/Image/Maximize/List/ImageMaximizeSlider";
import { ListDirection } from "@/shared/data/list.data";
import { IListTopLevel, TListItemOnClick } from "@/shared/model/list.model";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { SliderPagingVariant } from "@/shared/data/sliderT.data";
import { ImageProductionSliderT } from "@/features/SliderT/ImageProduction/ImageProductionSliderT";

interface CatalogImageProps{
    imageList?: string[]
    activeIndex?: number

    hasMaximize?: boolean
    isFullWindow?: boolean
    className?: string,
    
    propsLeftSlider?: IListTopLevel<string>,
    classNameCenterSlider?: string,
}

export const CatalogImage:FC<CatalogImageProps> = ({
    imageList=[], 
    activeIndex: activeOutIndex=0,
    hasMaximize=false, isFullWindow=false, 
    className,  
    propsLeftSlider, classNameCenterSlider,
}) => {
    // STATE
    const [activeIndex, setActiveIndex] = useState(0);
    const [is768, setIs768] = useState(false);

    // HANDLE
    const handleOnClick: TListItemOnClick<string> = (_, index) => {
        if (index !== undefined && index < imageList.length)
            setActiveIndex(index)
    }

    // EFFECT
    useEffect(() => {
        setActiveIndex(activeIndex)
    }, [activeOutIndex])

    return (
        <div className={cls(cl.block, isFullWindow ? cl.full : '', className)}>
            {!is768 && (
                <ImageProductionSliderT 
                    {...propsLeftSlider}
                    items={imageList} direction={ListDirection.Column}
                    gap={10} pagingVariant={SliderPagingVariant.Full} 
                    activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                    onClickItem={handleOnClick}
                    componentProps={{width: 80, height: 80}}
                    className={cls(cl.leftSlider, propsLeftSlider?.className)} 
                    classNameWrapper={cls(propsLeftSlider?.classNameWrapper, imageList.length === 1 ? cl.leftSliderWrapper : '')} />
            )}
            <ImageMaximizeSlider 
                items={imageList} gap={0}
                activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
                isIndexChangeOnClick={true}
                hasMaximize={hasMaximize} isFullWindow={isFullWindow} 
                className={classNameCenterSlider} />
            <HandleSize width={768} set={setIs768} />
        </div>
    )
}
