import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BaseSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getNameSupplier } from "../../lib/getters.supplier.lib";
import { ESupplierSubscribeViewItem } from "../../data/view.supplier.data";
import { SubscribeAutoToSupplierButton } from "../Button/Subscribe/Auto/SubscribeAutoToSupplierButton";
import Link from "next/link";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { IImageSizes } from "@/shared/model/image.model";
import { ImageAPIVariants } from "@/shared/data/image.data";
import { BottomBlockSupplier } from "../BottomBlock/BottomBlockSupplier";

interface BaseSupplierProps {
    supplier: ISupplier,
    supplierRating?: number,
    numberOfReviews?: number,
    hasImage?: boolean,
    hasVerifiedStatus?: boolean,
    hasCountry?: boolean,
    subscribeView?: ESupplierSubscribeViewItem
    isGray?: boolean,
    isForDescPage?: boolean,
    className?: string
    classNameName?: string,
    classNameVerified?: string,
    imageSizes?: IImageSizes
}

export const BaseSupplier: FC<BaseSupplierProps> = ({
    supplier,
    supplierRating,
    numberOfReviews,
    hasImage = false,
    hasVerifiedStatus = false,
    hasCountry,
    subscribeView = ESupplierSubscribeViewItem.NONE,
    isGray = false,
    isForDescPage = false,
    className,
    classNameName,
    classNameVerified,
    imageSizes }) => {

    const html = (
        <>
            {hasImage &&
                <ImageAPI src={supplier.photoId?.key} alt={supplier.photoId?.name}
                          variantDefault={ImageAPIVariants.Supplier} 
                          width={imageSizes?.width ?? 40} height={imageSizes?.height ?? 40} fill={true}
                          className={cl.image} />
            }
            <div className={cls(cl.content, isForDescPage ? cl.DescPageContent : '')}>
                <span className={cls(cl.name, isForDescPage ? cl.bigName : '', classNameName)}>{getNameSupplier(supplier)}</span>
                <BottomBlockSupplier supplier={supplier}
                    hasVerifiedStatus={hasVerifiedStatus}
                    hasCountry={hasCountry}
                    supplierRating={supplierRating}
                    numberOfReviews={numberOfReviews}
                    isForDescPage={isForDescPage}
                    classNameVerified={classNameVerified}
                />
            </div>
            <SubscribeAutoToSupplierButton view={subscribeView} supplierId={supplier.id} />
        </>

    )

    if (isForDescPage) return (
        <div className={cl.isForDescPage}>
            {html}
        </div>
    );

    return (
        <Link href={MAIN_PAGES.CURRENT_SUPPLIER(supplier.id).path} className={cls(cl.block, isGray ? cl.gray : '', className)}>
            {html}
        </Link>
    )
}
