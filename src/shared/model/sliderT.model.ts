import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { SliderPagingVariant } from "../data/sliderT.data";
import { IList, IListTopLevel } from "./list.model";

export interface ISliderTTop<T> extends IListTopLevel<T> {
    pagingVariant?: SliderPagingVariant
    pagingAmount?: number
    slideWidth?: number
    isFull?: boolean
    isIndexChangeOnClick?: boolean
    classNameSlider?: string,
    classNameWrapper?: string,
    hasGalleryCounter?: boolean
}

export interface ISliderT<T> extends ISliderTTop<T> {
    component: IList<T>['component']
}
