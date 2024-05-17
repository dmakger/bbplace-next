import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageMainBlock.module.scss'
import { TenderPageHeader, TenderPageMainInfo } from "../../.."
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "../../../model/tender.model"
import { useState } from "react"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav"
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { ScrollSlider } from "@/features/ScrollSlider"
import { ImageSlide } from "@/widgets/Slider/Image/item/ImageSlide"

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
    return (
        <>
            <section className={cls(cl.TenderPageMainBlock, className)}>
                <TenderPageHeader
                    tender={tender}
                    tenderType={tenderType} />

                <SupplierWNav
                    className={cl.supplierBlock}
                    classNameSupplier={cl.supplier}
                    classNameNavs={cl.navSupplier}

                    id={tender.ownerId}
                    hasImage
                    subscribeView={ESupplierSubscribeViewItem.LARGE_OUTLINE}
                    navs={[
                        is768 ? ESupplierToChatViewItem.SMALL : ESupplierToChatViewItem.NONE
                    ]}
                />
                {images.length > 1 && <ScrollSlider
                className={cl.slider}
                        component={ImageSlide}
                        width={150}
                        height={150}
                        slides={images}
                        classNameSlides={cl.imageSlide} />}

                <TenderPageMainInfo tender={tender} />
            </section>
            <HandleSize width={768} set={setIs768} />
        </>

    )
}
