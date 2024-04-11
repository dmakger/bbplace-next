"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ViewButtonsProduct.module.scss'
import { GalleryViewButton } from "@/shared/ui/Button/GalleryView/GalleryViewButton";
import { ListViewButton } from "@/shared/ui/Button/ListView/ListViewButton";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { useSearchParams } from "next/navigation";
import { PRODUCT_PARAMS } from "@/config/params/product.params.config";


interface ViewButtonsButtonProps{
    className?: string,
}

export const ViewButtonsButton:FC<ViewButtonsButtonProps> = ({className}) => {
    const searchParams = useSearchParams()
    const [productView, setProductView] = useState<string | null>(null)    

    useEffect(() => {
        const _productView = PRODUCT_PARAMS.getView(searchParams.get(PRODUCT_PARAMS.VIEW__KEY))
        if (_productView !== productView)
            setProductView(_productView)
    }, [searchParams, productView])

    const handleOnClick = (_view: string) => {
        setProductView(_view)
    }
    
    return (
        <div className={cls(cl.block, className)}>
            <GalleryViewButton href={`${MAIN_PAGES.PRODUCTS}?${PRODUCT_PARAMS.VIEW__KEY}=${PRODUCT_PARAMS.VERTICAL_VIEW__VALUE}`} 
                                isActive={productView === PRODUCT_PARAMS.VERTICAL_VIEW__VALUE} 
                                onClick={() => handleOnClick(PRODUCT_PARAMS.VERTICAL_VIEW__VALUE)} />
            <ListViewButton href={`${MAIN_PAGES.PRODUCTS}?${PRODUCT_PARAMS.VIEW__KEY}=${PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE}`} 
                            isActive={productView === PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE} 
                            onClick={() => handleOnClick(PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE)} />
        </div>
    )
}
