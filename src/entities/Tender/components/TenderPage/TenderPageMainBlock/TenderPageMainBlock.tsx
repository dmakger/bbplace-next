import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageMainBlock.module.scss'
import { TenderPageHeader } from "../TenderPageHeader/TenderPageHeader"
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "../../../model/tender.model"
import { useState } from "react"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ScrollSlider } from "@/features/ScrollSlider"
import { ImageSlide } from "@/widgets/Slider/Image/item/ImageSlide"
import { SWITCH_SELECTOR_TENDER_OPTIONS } from "@/entities/Tender/data/tender.data"
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector"
import { DetailedPageInfo } from "@/features/DetailedPageInfo"

interface ITenderPageMainBlock {
    className?: string,
    tender: ISaleTender | IPurchaseTender,
    tenderType: ETenderType
}

export const TenderPageMainBlock = ({
    className,
    tender,
    tenderType
}: ITenderPageMainBlock) => {

    //STATE
    const [is768, setIs768] = useState<boolean>(false)

    const images = tender.attachments.map((it: ITenderAttachments) => it.key)

    const optionsTab = [
        <p>
            {tender.description}
        </p>
    ]
    return (
        <>
            <section className={cls(cl.TenderPageMainBlock, className)}>
                <TenderPageHeader
                    tender={tender}
                    tenderType={tenderType} />

                <SupplierWNav
                    className={cl.supplierBlock}
                    classNameNavs={cl.navSupplier}

                    id={tender.ownerId}
                    hasImage
                    navs={[
                        ESupplierSubscribeViewItem.LARGE_OUTLINE,
                        is768 ? ESupplierToChatViewItem.SMALL_WIDE : ESupplierToChatViewItem.NONE
                    ]}
                />
                {images.length > 1 && <ScrollSlider
                    className={cl.slider}
                    component={ImageSlide}
                    width={150}
                    height={150}
                    slides={images}
                    classNameSlides={cl.imageSlide}
                    isScale />}

                <DetailedPageInfo options={SWITCH_SELECTOR_TENDER_OPTIONS}
                    defaultOption={SWITCH_SELECTOR_DESCRIPTION_OPTION}
                    optionsTab={optionsTab}
                />
            </section>
            <HandleSize width={768} set={setIs768} />
        </>

    )
}
