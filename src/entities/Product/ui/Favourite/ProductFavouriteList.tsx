import { FC } from "react"

import { List } from "@/shared/ui/List/Default/List";
import { IListTopLevel } from "@/shared/model/list.model";
import { IProduct } from "../../model/product.model";
import { ProductH } from "../Horizontal";
import { ProductV } from "../Vertical";

interface ProductFavouriteListProps extends IListTopLevel<IProduct> {
    isHorizontalProduct?: boolean
}

export const ProductFavouriteList:FC<ProductFavouriteListProps> = ({
    isHorizontalProduct=true,
    ...rest
}) => {
    return (
        <List component={isHorizontalProduct ? ProductH : ProductV} {...rest}/>
    )
}
