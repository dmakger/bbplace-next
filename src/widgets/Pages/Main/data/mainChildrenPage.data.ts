import { ISliderImage } from "@/shared/model/sliderT.model";
import PrimeBanner from '@/shared/assets/img/PrimeBanner/PrimeBanner.png'
import PrimeBannerMobile from '@/shared/assets/img/PrimeBanner/PrimeBannerMobile.png'

export const PRIME_SLIDER_FIRST_ITEM: ISliderImage = {
    id: 1,
    src: PrimeBanner
}

export const PRIME_SLIDER_MOBILE_FIRST_ITEM: ISliderImage = {
    id: 2,
    src: PrimeBannerMobile
}

export const PRIME_SLIDER_LIST: ISliderImage[] = [
    PRIME_SLIDER_FIRST_ITEM,
    PRIME_SLIDER_FIRST_ITEM
]

export const PRIME_MOBILE_SLIDER_LIST: ISliderImage[] = [
    PRIME_SLIDER_MOBILE_FIRST_ITEM,
    PRIME_SLIDER_MOBILE_FIRST_ITEM
]