import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageProductionSliderTItem.module.scss'

interface ImageProductionSliderTItemProps{
    className?: string,
}

export const ImageProductionSliderTItem:FC<ImageProductionSliderTItemProps> = ({className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
