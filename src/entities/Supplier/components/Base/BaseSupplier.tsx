import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BaseSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { ImageAPI } from "@/shared/ui/Image/ImageAPI";
import { BottomLineSupplier } from "../BottomLine/BottomLineSupplier";
import { getNameSupplier } from "../../lib/getters.supplier.lib";
import { SubscribeToSupplierButton } from "../Button/Subscribe/SubscribeToSupplierButton";

interface BaseSupplierProps{
    supplier: ISupplier
    hasImage?: boolean
    hasSubscribe?: boolean
    className?: string
    classNameName?: string
}

export const BaseSupplier:FC<BaseSupplierProps> = ({supplier, hasImage=false, hasSubscribe=false, className, classNameName}) => {        
    return (
        <div className={cls(cl.block, className)}>
            {hasImage && supplier.photoId &&
                <ImageAPI src={supplier.photoId.key} alt={supplier.photoId.name} className={cl.image} />
            }
            <div className={cl.content}>
                <span className={cls(cl.name, classNameName)}>{getNameSupplier(supplier)}</span>
                <BottomLineSupplier supplier={supplier} />
            </div>
            {hasSubscribe &&
                <SubscribeToSupplierButton isSubscribed={false} />
            }
        </div>
    )
}
