import { FC, useCallback } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { ButtonMaximize } from "@/shared/ui/Button/data/Maximize/ButtonMaximize";
import React from "react";
import { IListItem } from "@/shared/model/list.model";

interface ImageMaximizeSlideProps extends IListItem<string>{
    // slide: string
    // style?: object
    // onClickMaximize?: Function
    isFullWindow?: boolean
    width?: number
    height?: number
    hasMaximize?: boolean
    classNameImage?: string
}

export const ImageMaximizeSlide:FC<ImageMaximizeSlideProps> = React.memo(({
    item, 
    onClick, 
    isFullWindow,
    hasMaximize=false,
    width=350, height=350, 
    className, 
    classNameImage
}) => {
    const handleOnClickMaximize = useCallback(() => {
        if (onClick) onClick()
    }, [])
    
    return (
        <div className={cls(cl.wrapper, isFullWindow ? cl.fullWindow : '', className)}>
            {hasMaximize && 
                <ButtonMaximize onClick={handleOnClickMaximize} className={cl.maximize} />
            }
            <ImageAPI src={item} width={width} height={height} className={cls(cl.image, classNameImage)} />
        </div>
    )
})
