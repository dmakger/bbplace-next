import { Dispatch, SetStateAction } from "react";
import { ListDirection } from "../data/list.data";
import { TAnyParams } from "./params.model";

/**
 * Интерфейс необходимый для реализации списка **верхнего уровня**.  
 * Отличается от `IList` отсутствием поля `component`
 */
export interface IListTopLevel<T> extends TAnyParams {
    items: T[];
    activeId?: number | string
    activeIndex?: number
    setActiveIndex?: Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<number | undefined>>
    listRef?: React.RefObject<HTMLDivElement>
    componentProps?: TAnyParams;
    onClickItem?: TListItemOnClick<T>
    generateKey?: (it: T, index?: number) => number | string
    direction?: ListDirection;
    gap?: number
    className?: string;
    classNameItem?: string;
}

/**
 * Интерфейс необходимый для реализации списка.  
 */
export interface IList<T> extends IListTopLevel<T> {
    component: React.FC<IListItem<T>>;
}


/**
 * Интерфейс необходимый для реализации элемента списка.  
 * Применяется в интерфейсе `IList`
 */
export interface IListItem<T> extends TAnyParams {
    item: T,
    activeId?: number | string
    isActive?: boolean
    // onClick?: TListItemOnClick<T>
    onClick?: Function
    style?: object
    className?: string,
}

/**
 * Функция нажатия на `ListItem`
 */
export type TListItemOnClick<T> = (it: T, index?: number) => void
