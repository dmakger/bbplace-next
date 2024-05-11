'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageHeader.module.scss'
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "../../../model/tender.model"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ScrollSlider } from "@/features/ScrollSlider"
import { ImageSlide } from "@/widgets/Slider/Image/item/ImageSlide"
import { TenderPageAdditionalInfo } from "../TenderPageAdditionalInfo/TenderPageAdditionalInfo"
import { useState } from "react"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"


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

    //STATE
    const [is500, setIs500] = useState(false)


    const images = JSON.parse(tender.attachments).map((it: ITenderAttachments) => it.key)

    return (
        <>
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
                        classNameNavs={cl.navSupplier}
                        classNameSupplier={cl.supplier}
                        hasImage
                        id={tender.ownerId}
                        subscribeView={ESupplierSubscribeViewItem.LARGE_OUTLINE}
              
                        navs={[
                            is500 ? ESupplierToChatViewItem.SMALL : ESupplierToChatViewItem.NONE
                        ]}
                    />
                </div>
                <div className={cl.bottomContainer}>
                    <TenderPageAdditionalInfo
                        className={cl.additionalInfo}
                        tender={tender} />
                    {images.length > 1 && <ScrollSlider
                        component={ImageSlide}
                        width={150}
                        height={150}
                        slides={images}
                        classNameSlides={cl.imageSlide} />}
                </div>
            </div>
            <HandleSize width={500} set={setIs500} />
        </>


    )
}
