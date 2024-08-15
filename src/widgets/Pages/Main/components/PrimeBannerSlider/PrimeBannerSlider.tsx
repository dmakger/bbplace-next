import { cls } from "@/shared/lib/classes.lib"
import cl from './_PrimeBannerSlider.module.scss'
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { PrimeBannerSliderItem } from "../PrimeBannerSliderItem/PrimeBannerSliderItem"
import { ISliderImage, ISliderTTop } from "@/shared/model/sliderT.model"

interface IPrimeBannerSlider extends ISliderTTop<ISliderImage>{
    className?: string,

}

export const PrimeBannerSlider = ({className, ...rest}: IPrimeBannerSlider) => {
    return (
        <div className={cls(cl.PrimeBannerSlider, className)}>
            <SliderT component={PrimeBannerSliderItem} className={className} hasGalleryCounter {...rest}/>
        </div>
    )
}
