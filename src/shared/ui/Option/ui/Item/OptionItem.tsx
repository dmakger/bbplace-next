import { useEffect, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionItem.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import Link from "next/link";
import { IOption } from "@/shared/model/option.model";
import { HoverWindow } from "@/shared/ui/HoverWindow";

interface IOptionItem {
    option: IOption
    active?: boolean
    onClick?: Function
    classNameItem?: string,
    isSizes?: boolean,
    isList?: boolean,
    isOnHover?: boolean,
    itemsWidths: number[]
}

export const OptionItem= ({ 
    option,
    active = false,
    onClick = () => { },
    classNameItem,
    isSizes = false,
    isList,
    isOnHover = false,
    itemsWidths
}: IOptionItem) => {

    //REF
    const itemRef = useRef<HTMLDivElement>(null)

    //EFFECT
    useEffect(() => {
        if (itemRef.current && isSizes && option) {
            itemsWidths.push(itemRef.current.offsetWidth)
        }
    }, [isSizes, option]);
    
    //HTML
    const props = {
        className: cls(cl.item, active ? cl.active : '', classNameItem, isList ? cl.listItem : '')
    }    

    const optionParamsImage = typeof(option.params?.image) === 'string' ? option.params.image : '';    
    

    const html = (
        
            <div className={cls(cl.optionItem, isList ? cl.row : '')} >
                     {isOnHover && !isList && <HoverWindow text={option.name} image={optionParamsImage} className={cl.hoverWindow}/>}

                {optionParamsImage &&
                    <ImageAPI src={`${optionParamsImage}`} className={cl.image} width={48} height={48} />
                }
                {(isSizes || isList) && <span className={cl.name}>{option.name}</span>}
            </div>

    )
    if (option.params?.href === undefined)
        return (
            <div onClick={() => onClick(option)} {...props} ref={itemRef}>{html}</div>
        )

    return (
        <Link href={`${option.params?.href}`} {...props}>
            {html}
        </Link>
    )
}
