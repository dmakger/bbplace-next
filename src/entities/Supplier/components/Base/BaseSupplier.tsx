import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BaseSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { BottomLineSupplier } from "../BottomLine/BottomLineSupplier";
import { getNameSupplier } from "../../lib/getters.supplier.lib";
import { ESupplierSubscribeViewItem } from "../../data/view.supplier.data";
import { SubscribeAutoToSupplierButton } from "../Button/Subscribe/Auto/SubscribeAutoToSupplierButton";
import Link from "next/link";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { IImageSizes } from "@/shared/model/image.model";

interface BaseSupplierProps{
    supplier: ISupplier,
    supplierRating?: number,
    hasImage?: boolean
    subscribeView?: ESupplierSubscribeViewItem
    isGray?: boolean
    className?: string
    classNameName?: string,
    imageSizes?: IImageSizes
}

export const BaseSupplier:FC<BaseSupplierProps> = ({supplier, supplierRating, hasImage=false, subscribeView=ESupplierSubscribeViewItem.NONE, isGray=false, className, classNameName, imageSizes}) => {        
    return (
        <Link href={MAIN_PAGES.CURRENT_SUPPLIER(supplier.id)} className={cls(cl.block, isGray ? cl.gray : '', className)}>
            {hasImage && supplier.photoId &&
                <ImageAPI src={supplier.photoId.key} alt={supplier.photoId.name} className={cl.image} width={imageSizes?.width} height={imageSizes?.height} />
            }
            <div className={cl.content}>
                <span className={cls(cl.name, classNameName)}>{getNameSupplier(supplier)}</span>
                <BottomLineSupplier supplier={supplier} supplierRating={supplierRating}/>
            </div>
            <SubscribeAutoToSupplierButton view={subscribeView} supplierId={supplier.id} />
        </Link>
    )
}
