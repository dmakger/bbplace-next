export interface ISlider {
    activeIndex?: number
    setActiveIndex?: (index: number) => any
    isLoading: boolean
    limit?: number,
    setLimit?: Function,
    amount: number,
    className?: string,
    classNameSlides?: string
}