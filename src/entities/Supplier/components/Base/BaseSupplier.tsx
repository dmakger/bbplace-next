import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BaseSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { ImageAPI } from "@/shared/ui/Image/ImageAPI";

interface BaseSupplierProps{
    supplier: ISupplier,
    hasImage?: boolean
    className?: string,
}

export const BaseSupplier:FC<BaseSupplierProps> = ({supplier, hasImage=false, className}) => {
    console.log('supplier', supplier);
    
    
    return (
        <div className={cls(cl.block, className)}>
            {hasImage &&
                <ImageAPI src={supplier.photoId.key} alt={supplier.photoId.name} className={cl.image} />
            }
            <div className={cl.content}>
                <span className={cl.name}>{supplier.brandName}</span>
            </div>
        </div>
    )
}
