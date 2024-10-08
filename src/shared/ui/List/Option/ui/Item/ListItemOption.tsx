import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ListItemOption.module.scss'
import { IListItem } from "@/shared/model/list.model";
import { IOption } from "@/shared/model/option.model";

interface ListItemOptionProps extends IListItem<IOption> {
}

export const ListItemOption: FC<ListItemOptionProps> = ({
    item,
    onClick,
    className,
    classNameText,
    activeId, isActive,
    ...rest
}) => {
    // HANDLE
    const handleOnClickOption: IListItem<IOption>['onClick'] = (it: IOption) => {
        if (onClick)
            onClick(it)
    }

    return (
        <div onClick={() => handleOnClickOption(item)} className={cls(cl.option, className)} {...rest} key={item.id}>
            <span className={classNameText}>{item.name}</span>
        </div>
    )
}
