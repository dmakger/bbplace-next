'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageHeader.module.scss'
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "../../model/tender.model"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ESupplierView } from "@/entities/Supplier/data/supplier.data"
import { ScrollSlider } from "@/features/ScrollSlider/ui/ScrollSlider"
import { ImageSlide } from "@/widgets/Slider/Image/item/ImageSlide"

interface ITenderPageHeader {
    className?: string,
    tender: IPurchaseTender | ISaleTender,
    tenderType: ETenderType
}

export const TenderPageHeader = ({
    className,
    tender,
    tenderType
}: ITenderPageHeader) => {

    const images = JSON.parse(tender.attachments).map((it: ITenderAttachments) => it.key)
        
    return (
        <div className={cls(cl.TenderPageHeader, className)}>
            <div className={cl.topContainer}>
                <span className={cl.tenderType}>
                    {tenderType}
                </span>
                <p className={cl.tenderName}>
                    {tender.name}
                </p>
            </div>
            <div className={cl.middleContainer}>
                <SupplierWNav
                  
                    classNameSupplier={cl.supplier}
                    hasImage
                    id={tender.ownerId}
                    subscribeView={ESupplierSubscribeViewItem.LARGE_OUTLINE}
                />
            </div>
            <div className={cl.bottomContainer}>
                <ScrollSlider component={ImageSlide} slides={images} classNameSlides={cl.imageSlide}/>
            </div>
        </div>
    )
}
