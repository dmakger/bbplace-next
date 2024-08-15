import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ChatDataList.module.scss'
import { IListTopLevel } from "@/shared/model/list.model";
import { IChatData } from "@/entities/Chat/model/chat.model";
import { List } from "@/shared/ui/List/Default/List";
import { ChatDataItem } from "../Item/ChatDataItem";

interface ChatDataListProps extends IListTopLevel<IChatData> {}

export const ChatDataList:FC<ChatDataListProps> = ({
    className,
    ...rest
}) => {
    console.log('qwe rest', rest.activeId)
    return (
        <List component={ChatDataItem} 
              className={cls(cl.list, className)}
              {...rest} />
    )
}
