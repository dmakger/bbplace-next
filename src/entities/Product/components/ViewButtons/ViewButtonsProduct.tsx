"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ViewButtonsProduct.module.scss'
import { GalleryViewButton } from "@/shared/ui/Button/data/GalleryView/GalleryViewButton";
import { ListViewButton } from "@/shared/ui/Button/data/ListView/ListViewButton";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { usePathname, useSearchParams } from "next/navigation";
import { PRODUCT_PARAMS } from "@/config/params/product.params.config";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";


interface ViewButtonsButtonProps{
    className?: string,
}

export const ViewButtonsButton:FC<ViewButtonsButtonProps> = ({...rest}) => {
    return (
        <SuspenseL>
            <ViewButtonsButtonChild {...rest}/>
        </SuspenseL>
    )
}


export const ViewButtonsButtonChild:FC<ViewButtonsButtonProps> = ({className}) => {
    // PATH
    const searchParams = useSearchParams()

    // STATE
    const [productView, setProductView] = useState<string | null>(null)    
    const [galleryParams, setGalleryParams] = useState<string>(searchParams.toString())    
    const [listParams, setListParams] = useState<string>(searchParams.toString())    

    // EFFECT
    useEffect(() => {
        const _productView = PRODUCT_PARAMS.getView(searchParams.get(PRODUCT_PARAMS.VIEW__KEY))
        if (_productView !== productView)
            setProductView(_productView)
    }, [searchParams, productView])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        setGalleryParams(prevState => {
            const _galleryParams = new URLSearchParams(params.toString());
            _galleryParams.set(PRODUCT_PARAMS.VIEW__KEY, PRODUCT_PARAMS.VERTICAL_VIEW__VALUE)
            const strGalleryParams = _galleryParams.toString()
            return strGalleryParams !== prevState ? strGalleryParams : prevState
        })
        setListParams(prevState => {
            const _listParams = new URLSearchParams(params.toString());
            _listParams.set(PRODUCT_PARAMS.VIEW__KEY, PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE)
            const strListParams = _listParams.toString()
            return strListParams !== prevState ? strListParams : prevState
        })
    }, [searchParams])

    // ON CLICK
    const handleOnClick = (_view: string) => {
        setProductView(_view)
    }
    
    return (
        <div className={cls(cl.block, className)}>
            <GalleryViewButton href={`${MAIN_PAGES.PRODUCTS}?${galleryParams.toString()}`} 
                                isActive={productView === PRODUCT_PARAMS.VERTICAL_VIEW__VALUE} 
                                onClick={() => handleOnClick(PRODUCT_PARAMS.VERTICAL_VIEW__VALUE)} />
            <ListViewButton href={`${MAIN_PAGES.PRODUCTS}?${listParams.toString()}`} 
                            isActive={productView === PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE} 
                            onClick={() => handleOnClick(PRODUCT_PARAMS.HORIZONTAL_VIEW__VALUE)} />
        </div>
    )
}
