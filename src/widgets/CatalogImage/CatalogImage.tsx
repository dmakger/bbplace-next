import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageAD } from "@/shared/ui/Image/Active/ImageActive";
import { ImageMaximizeSlider } from "../Slider/Image/Maximize/List/ImageMaximizeSlider";

interface CatalogImageProps{
    imageList?: string[]
    hasMaximize?: boolean
    isFullWindow?: boolean
    className?: string,
}

export const CatalogImage:FC<CatalogImageProps> = ({imageList=[], hasMaximize=false, isFullWindow=false, className}) => {
    // STATE
    const [activeIndex, setActiveIndex] = useState(0);
    const [limit, setLimit] = useState(1);

    // HANDLE
    const handleOnClick = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.column}>
                {imageList.map((image, index) => (
                    <button onClick={() => handleOnClick(index)} key={index}>
                        <ImageAD src={image} isActive={index === activeIndex} className={cl.image} />
                    </button>
                ))}
            </div>
            <ImageMaximizeSlider slides={imageList} isLoading={false}
                                activeIndex={activeIndex} setActiveIndex={handleOnClick}
                                amount={1} limit={limit} setLimit={setLimit} 
                                hasMaximize={hasMaximize} isFullWindow={isFullWindow}/>
        </div>
    )
}
