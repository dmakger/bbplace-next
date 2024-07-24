import { ListDirection } from "../data/list.data";
import { TAnyParams } from "./params.model";

/**
 * Интерфейс необходимый для реализации списка **верхнего уровня**.  
 * Отличается от `IList` отсутствием поля `component`
 */
export interface IListTopLevel<T> extends TAnyParams {
    items: T[];
    componentProps?: TAnyParams;
    onClickItem?: TListItemOnClick<T>
    direction?: ListDirection;
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
    onClick?: TListItemOnClick<T>
    className?: string,
}

/**
 * Функция нажатия на `ListItem`
 */
export type TListItemOnClick<T> = (it: T) => void