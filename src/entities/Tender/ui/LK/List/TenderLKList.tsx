import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderLKList.module.scss'
import { IListTopLevel } from "@/shared/model/list.model";
import { ITender } from "@/entities/Tender/model/tender.model";
import { List } from "@/shared/ui/List/Default/List";
import { TenderLKItem } from "../Item/TenderLKItem";

interface TenderLKListProps extends IListTopLevel<ITender> {
    onClickDelete?: Function
}

export const TenderLKList: FC<TenderLKListProps> = ({
    items,
    onClickDelete,
    ...rest
}) => {
    return (
        <List items={items} 
              component={TenderLKItem} componentProps={{onClickDelete}} 
              {...rest} />
    )
}
