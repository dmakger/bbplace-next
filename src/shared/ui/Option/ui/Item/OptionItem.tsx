import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionItem.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import Link from "next/link";
import { IOption } from "@/shared/model/option.model";

interface OptionItemProps{
    option: IOption
    active?: boolean
    onClick?: Function
    className?: string,
}

export const OptionItem:FC<OptionItemProps> = ({option, active=false, onClick=()=>{}, className}) => {
    const props = {
        className: cls(cl.item, active ? cl.active : '', className)
    }

    const html = (
        <>
            {option.params?.image &&
                <ImageAPI src={`${option.params.image}`} className={cl.image}/>
            }
            <span className={cl.name}>{option.name}</span>
        </>
    )
    if (option.params?.href === undefined)
        return (
            <div onClick={() => onClick()} {...props}>{html}</div>
        )

    return (
        <Link href={`${option.params.href}`} {...props}>
            {html}
        </Link>
    )
}
