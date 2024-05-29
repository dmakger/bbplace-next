import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageAD } from "@/shared/ui/Image/Active/ImageActive";
import { ImageMaximizeSlider } from "../Slider/Image/Maximize/List/ImageMaximizeSlider";
import { Button, ButtonVariant } from "@/shared/ui/Button";

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

    // HANDLE
    const handleOnClick = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className={cls(cl.block, isFullWindow ? cl.full : '', className)}>
            <div className={cl.column}>
                <div className={cl.columnData}>
                    {imageList.map((image, index) => (
                        <Button variant={ButtonVariant.DEFAULT} onClick={() => handleOnClick(index)} key={index}>
                            <ImageAD src={image} isActive={index === activeIndex} classNameImage={cl.image} />
                        </Button>
                    ))}
                </div>
            </div>
            <ImageMaximizeSlider slides={imageList} isLoading={false}
                                activeIndex={activeIndex} setActiveIndex={handleOnClick}
                                amount={1} limit={limit} setLimit={setLimit} 
                                classNameSlide={cls(isFullWindow ? cl.slideFull : '', classNameSlide)}
                                hasMaximize={hasMaximize} isFullWindow={isFullWindow}/>
        </div>
    )
}
