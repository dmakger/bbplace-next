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

interface BaseSupplierProps {
    supplier: ISupplier,
    supplierRating?: number,
    numberOfReviews?: number,
    hasImage?: boolean
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
                <ImageAPI src={supplier.photoId?.key} alt={supplier.photoId?.name} className={cl.image} width={imageSizes?.width} height={imageSizes?.height} />
            }
            <div className={cls(cl.content, isForDescPage ? cl.DescPageContent : '')}>
                <span className={cls(cl.name, isForDescPage ? cl.bigName : '', classNameName)}>{getNameSupplier(supplier)}</span>
                <BottomLineSupplier supplier={supplier}
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
