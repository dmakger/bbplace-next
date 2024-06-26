import { TAnyParams } from "@/shared/model/params.model"

export interface ISlider {
    activeIndex?: number
    setActiveIndex?: (index: number) => any
    isLoading: boolean
    limit?: number,
    setLimit?: Function,
    amount: number,

    slideProps?: TAnyParams
    className?: string,
    classNameSlides?: string
}