import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageMaximizeSlider } from "../Slider/Image/Maximize/List/ImageMaximizeSlider";
import { ImageProductionSliderT } from "@/features/SliderT/ImageProduction/ui/ImageProductionSliderT";
import { ListDirection } from "@/shared/data/list.data";
import { TListItemOnClick } from "@/shared/model/list.model";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";

interface CatalogImageProps{
    imageList?: string[]
    hasMaximize?: boolean
    isFullWindow?: boolean
    className?: string,
    classNameSlide?: string,
}

export const CatalogImage:FC<CatalogImageProps> = ({imageList=[], hasMaximize=false, isFullWindow=false, className, classNameSlide}) => {
    // STATE
    const [activeIndex, setActiveIndex] = useState(1);
    const [is768, setIs768] = useState(false);

    // HANDLE
    const handleOnClick: TListItemOnClick<string> = (_, index) => {
        if (index !== undefined && index < imageList.length)
            setActiveIndex(index)
    }

    useEffect(() => {
        console.log('qwe activeIndex', activeIndex)
    }, [activeIndex])

    return (
        <div className={cls(cl.block, isFullWindow ? cl.full : '', className)}>
            {!is768 && (
                <ImageProductionSliderT 
                    items={imageList} direction={ListDirection.Column}
                    gap={10} pagingAmount={3} 
                    activeIndex={activeIndex}
                    onClickItem={handleOnClick}
                    componentProps={{width: 80, height: 80}}
                    className={cl.slider} />
            )}
            <ImageMaximizeSlider 
                items={imageList} gap={0}
                activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
                // onClickItem={handleOnClick}
                amount={1}
                hasMaximize={hasMaximize} isFullWindow={isFullWindow} />
            <HandleSize width={768} set={setIs768} />
        </div>
    )
}
