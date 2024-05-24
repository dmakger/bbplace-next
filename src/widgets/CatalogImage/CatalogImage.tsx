import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_CatalogImage.module.scss'
import { ImageSlider } from "../Slider/Image/list/ImageSlider";
import { ImageAD } from "@/shared/ui/Image/Active/ImageActive";

interface CatalogImageProps{
    imageList?: string[]
    className?: string,
}

export const CatalogImage:FC<CatalogImageProps> = ({imageList=[], className}) => {
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
            <ImageSlider slides={imageList} isLoading={false} 
                        activeIndex={activeIndex} setActiveIndex={handleOnClick}
                        amount={1} limit={limit} setLimit={setLimit} />
        </div>
    )
}
