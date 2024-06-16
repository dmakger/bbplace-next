import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionT.module.scss'
import { OptionVariant } from "@/shared/data/option.data";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface OptionProps{
    image?: string
    text: string
    variant?: OptionVariant
    className?: string,
}

export const OptionT:FC<OptionProps> = ({image, text, variant=OptionVariant.TO_GRAY, className}) => {
    return (
        <button className={cls(cl.option, cl[variant], className)}>
            {image && 
                <ImageAPI src={image} className={cl.image} />
            }
            <span className={cl.text}>{text}</span>
        </button>
    )
}
