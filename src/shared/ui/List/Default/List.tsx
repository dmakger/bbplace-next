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
    activeId,
    activeIndex,
    gap,
    onClickItem = () => {},
    generateKey,
    style,
    className,
    classNameItem,
    ...rest
}: ListProps<T>) => {

    // Объединяем className из componentProps с classNameItem, если они оба существуют
    const updatedComponentProps = {
        ...componentProps,
        className: cls(componentProps?.className, classNameItem)
    };

    return (
        <div ref={listRef} style={{ gap: `${gap}px` }} className={cls(cl.list, cl[direction], className)} {...rest}>
            {items.map((it, index) => (
                <ListItemComponent
                    {...updatedComponentProps}
                    item={it}
                    style={style}
                    onClick={() => onClickItem(it, index)}
                    activeId={activeId}
                    isActive={activeIndex === index || !!(it && typeof it === 'object' && 'id' in it && it.id && activeId === it.id)}
                    key={generateKey ? generateKey(it, index) : (it && typeof it === 'object' && 'id' in it ? it.id as number : index)}
                />
            ))}
        </div>
    )
}
