import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageMaximizeSlider } from "../Slider/Image/Maximize/List/ImageMaximizeSlider";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [limit, setLimit] = useState(1);
    const [is768, setIs768] = useState(false);

    // HANDLE
    const handleOnClick: TListItemOnClick<string> = (_, index) => {
        if (index !== undefined && index < imageList.length)
            setActiveIndex(index)
    }

    return (
        <div className={cls(cl.block, isFullWindow ? cl.full : '', className)}>
            {!is768 && (
                <ImageProductionSliderT 
                    items={imageList} direction={ListDirection.Column}
                    gap={10} 
                    pagingAmount={3} activeIndex={activeIndex}
                    onClickItem={handleOnClick}
                    componentProps={{width: 80, height: 80}}
                    className={cl.slider} />
            )}
            {/* <ImageMaximizeSlider slides={imageList} isLoading={false}
                                activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                                amount={1} limit={limit} setLimit={setLimit} 
                                classNameSlide={cls(cl.slide, isFullWindow ? cl.slideFull : '', classNameSlide)}
                                hasMaximize={hasMaximize} isFullWindow={isFullWindow}/> */}
            <ImageMaximizeSlider 
                items={imageList} gap={10}
                activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                amount={1}
                hasMaximize={hasMaximize} isFullWindow={isFullWindow} />
            <HandleSize width={768} set={setIs768} />
        </div>
    )
}
