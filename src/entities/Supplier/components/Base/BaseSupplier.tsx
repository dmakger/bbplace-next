import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BaseSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { ImageAPI } from "@/shared/ui/Image/ImageAPI";
// import { isVerified } from "../../lib/boolean.supplier.lib";

interface BaseSupplierProps{
    supplier: ISupplier,
    hasImage?: boolean
    className?: string,
    classNameName?: string,
}

export const BaseSupplier:FC<BaseSupplierProps> = ({supplier, hasImage=false, className, classNameName}) => {
    console.log('supplier', supplier);
    // isVerified
    
    return (
        <div className={cls(cl.block, className)}>
            {hasImage &&
                <ImageAPI src={supplier.photoId.key} alt={supplier.photoId.name} className={cl.image} />
            }
            <div className={cl.content}>
                <span className={cls(cl.name, classNameName)}>{supplier.brandName}</span>
            </div>
        </div>
    )
}
