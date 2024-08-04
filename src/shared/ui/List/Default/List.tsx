import { cls } from '@/shared/lib/classes.lib';
import cl from './_List.module.scss'
import { IList } from "../../../model/list.model";
import { DEFAULT__LIST_DIRECTION } from "@/shared/data/list.data";

interface ListProps<T> extends IList<T> {}

export const List = <T extends any>({
    items, 
    listRef,
    component: ListItemComponent,
    componentProps,
    direction = DEFAULT__LIST_DIRECTION,
    activeIndex,
    gap,
    onClickItem=()=>{},
    style,
    className,
    ...rest
}: ListProps<T>) => {
    return (
        <div ref={listRef} style={{gap: `${gap}px`}} className={cls(cl.list, cl[direction], className)}>
            {items.map((it, index) => (
               <ListItemComponent {...componentProps} item={it} style={style} onClick={() => onClickItem(it, index)}
                                  isActive={activeIndex === index}
                                  key={it && typeof it === 'object' && 'id' in it ? it.id as number : index} /> 
            ))}
        </div>
    )
}
