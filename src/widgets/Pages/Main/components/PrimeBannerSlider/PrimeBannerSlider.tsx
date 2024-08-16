import { cls } from "@/shared/lib/classes.lib"
import cl from './_PrimeBannerSlider.module.scss'
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { PrimeBannerSliderItem } from "../PrimeBannerSliderItem/PrimeBannerSliderItem"
import { ISliderTTop } from "@/shared/model/sliderT.model"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

interface IPrimeBannerSlider extends ISliderTTop<StaticImport>{
    className?: string,

}

export const PrimeBannerSlider = ({className, ...rest}: IPrimeBannerSlider) => {
    return (
        <div className={cls(cl.PrimeBannerSlider, className)}>
            <SliderT component={PrimeBannerSliderItem} className={className} hasGalleryCounter {...rest} />
        </div>
    )
}
