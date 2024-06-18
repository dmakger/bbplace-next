import { FC, useCallback } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { ButtonMaximize } from "@/shared/ui/Button/data/Maximize/ButtonMaximize";
import React from "react";

interface ImageMaximizeSlideProps{
    slide: string
    onClickMaximize?: Function
    isFullWindow?: boolean
    className?: string,
    classNameSlide?: string,
}

export const ImageMaximizeSlide:FC<ImageMaximizeSlideProps> = React.memo(({slide, onClickMaximize, isFullWindow, className, classNameSlide}) => {
    const handleOnClickMaximize = useCallback(() => {
        if (onClickMaximize) onClickMaximize()
    }, [])
    
    return (
        <div className={cls(cl.wrapper, isFullWindow ? cl.fullWindow : '', className, classNameSlide)}>
            {onClickMaximize && 
                <ButtonMaximize onClick={handleOnClickMaximize} className={cl.maximize} />
            }
            <ImageAPI src={slide} width={350} height={350} className={cls(cl.image)} />
        </div>
    )
})
