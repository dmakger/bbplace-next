import { FC } from "react"

import { List } from "@/shared/ui/List/Default/List";
import { TenderItem } from "../item/TenderItem";
import { IListTopLevel } from "@/shared/model/list.model";
import { ICommonTender } from "../../model/tender.model";

interface TenderFavouriteListProps extends IListTopLevel<ICommonTender> {}

export const TenderFavouriteList:FC<TenderFavouriteListProps> = ({
    ...rest
}) => {
    return (
        <List component={TenderItem} {...rest}/>
    )
}
