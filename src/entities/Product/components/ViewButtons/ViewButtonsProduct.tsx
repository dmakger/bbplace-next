"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ViewButtonsProduct.module.scss'
import { GalleryViewButton } from "@/shared/ui/Button/GalleryView/GalleryViewButton";
import { ListViewButton } from "@/shared/ui/Button/ListView/ListViewButton";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { EViewProductParams, VIEW_PRODUCT__KEY_PARAM } from "../../data/params.product.data";
import { useSearchParams } from "next/navigation";

interface ViewButtonsButtonProps{
    className?: string,
}

export const ViewButtonsButton:FC<ViewButtonsButtonProps> = ({className}) => {
    const searchParams = useSearchParams()
    const [productView, setProductView] = useState<EViewProductParams | null>(null)
    console.log('productView', productView);
    

    useEffect(() => {
        const _productView = searchParams.get(VIEW_PRODUCT__KEY_PARAM) as (EViewProductParams | null)
        if (productView === null && _productView === null)
            setProductView(EViewProductParams.VERTICAL)
        else if (_productView !== productView && _productView !== null)
            setProductView(_productView)
    }, [searchParams, productView])

    const handleOnClick = (_view: EViewProductParams) => {
        setProductView(_view)
    }
    
    return (
        <div className={cls(cl.block, className)}>
            <GalleryViewButton href={`${MAIN_PAGES.PRODUCTS}?${VIEW_PRODUCT__KEY_PARAM}=${EViewProductParams.VERTICAL}`} 
                                isActive={productView === EViewProductParams.VERTICAL} 
                                onClick={() => handleOnClick(EViewProductParams.VERTICAL)} />
            <ListViewButton href={`${MAIN_PAGES.PRODUCTS}?${VIEW_PRODUCT__KEY_PARAM}=${EViewProductParams.HORIZONTAL}`} 
                            isActive={productView === EViewProductParams.HORIZONTAL} 
                            onClick={() => handleOnClick(EViewProductParams.HORIZONTAL)} />
        </div>
    )
}
