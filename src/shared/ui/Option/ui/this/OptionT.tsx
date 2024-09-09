import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionT.module.scss'
import { OptionVariant } from "@/shared/data/option/option.data";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import Link from "next/link";

export interface OptionTProps{
    image?: string
    text: string | undefined | null
    variant?: OptionVariant
    className?: string,
    classNameImage?: string,
    classNameText?: string,
    onClick?: Function,
    href?: string
}

export const OptionT:FC<OptionTProps> = ({image, text = '', variant=OptionVariant.TO_GRAY, className, classNameImage, classNameText, onClick, href}) => {
    const handleOnClick = () => {
    if (onClick) 
            onClick()
    }

    const html = (
        <button onClick={handleOnClick} className={cls(cl.option, cl[variant], className)} >
            {image && 
                <ImageAPI src={image} className={cls(cl.image, classNameImage)} />
            }
            <span className={cls(cl.text, classNameText)}>{text ? text : ''}</span>
        </button>
    )

    if (!href)
        return html
    
    return (
        <Link href={href}>{html}</Link>
    )
}
