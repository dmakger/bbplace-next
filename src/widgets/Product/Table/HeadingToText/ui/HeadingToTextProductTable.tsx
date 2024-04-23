import { FC } from "react"
import { IProduct } from "@/entities/Product/model/product.model";
import { getDataHeadingToTextProductTable } from "../lib/htt.product.lib";

import cl from './_HeadingToTextProductTable.module.scss'
import { HeadingToTextTable } from "@/shared/ui/Text";

interface HeadingToTextProductTableProps{
    product: IProduct
    className?: string,
}

export const HeadingToTextProductTable:FC<HeadingToTextProductTableProps> = ({product, className}) => {
    return (
        <HeadingToTextTable data={getDataHeadingToTextProductTable(product)} 
                            isShort={true} 
                            classNameMainBlock={className} classNameHeadingItem={cl.headingItem} />
    )
}
