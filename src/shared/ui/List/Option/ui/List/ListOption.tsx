import { FC } from "react"

import { IOption } from "@/shared/model/option.model";
import { ListDirection } from "@/shared/data/list.data";
import { ListItemOption } from "../Item/ListItemOption";
import { List } from "../../../Default/List";
import { IList, IListTopLevel } from "@/shared/model/list.model";

export interface IListOptionProps extends IListTopLevel<IOption> {
    classNameOptionText?: string
}

export const ListOption: FC<IListOptionProps> =({
    items, direction, 
    onClickItem, 
    componentProps,
    className, classNameItem, classNameOptionText
}) => {
    
    // HANDLE
    const handleOnClickOption: IList<IOption>['onClickItem'] = (it) => {
        if (onClickItem)
            onClickItem(it)
    }

    return (
        <List items={items} direction={direction}
              component={ListItemOption} 
              onClickItem={onClickItem}
              componentProps={{
                ...componentProps,
                onClick: handleOnClickOption,
                className: classNameItem,
                classNameText: classNameOptionText,
              }} 
              className={className}/>
    )
}
