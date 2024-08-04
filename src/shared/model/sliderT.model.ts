import { SliderPagingVariant } from "../data/sliderT.data";
import { IList, IListTopLevel } from "./list.model";

export interface ISliderTTop<T> extends IListTopLevel<T> {
    pagingVariant?: SliderPagingVariant
    pagingAmount?: number
    slideWidth?: number
    classNameWrapper?: string
}

export interface ISliderT<T> extends ISliderTTop<T> {
    component: IList<T>['component']
}

