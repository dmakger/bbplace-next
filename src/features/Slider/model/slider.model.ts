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

export interface ISliderTopLevel<T> extends ISlider {
    slides?: T[]
}


export interface ISliderItem<T> extends TAnyParams {
    slide: T,
    style?: object
    setTypeOfFile?: Function
    className?: string,
}