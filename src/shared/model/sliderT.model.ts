import { IList, IListItem, IListTopLevel } from "./list.model";

export interface ISliderTTop<T> extends IListTopLevel<T> {
    slideWidth?: number
    classNameWrapper?: string
}

export interface ISliderT<T> extends ISliderTTop<T> {
    component: IList<T>['component']
}
