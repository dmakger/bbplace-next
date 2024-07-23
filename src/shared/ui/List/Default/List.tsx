import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_List.module.scss'
import { IList } from "../../../model/list.model";
import { DEFAULT__LIST_DIRECTION } from "@/shared/data/list.data";

interface ListProps<T> extends IList<T> {}

export const List = <T extends object>({
    items, 
    component: ListItemComponent,
    componentProps,
    direction = DEFAULT__LIST_DIRECTION,
    className
}: ListProps<T>) => {
    return (
        <div className={cls(cl.list, cl[direction], className)}>
            {items.map(it => (
               <ListItemComponent {...componentProps} item={it}/> 
            ))}
        </div>
    )
}
