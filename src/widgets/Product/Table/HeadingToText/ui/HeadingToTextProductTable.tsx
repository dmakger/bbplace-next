import { FC } from "react"
import { IProduct } from "@/entities/Product/model/product.model";
import { HeadingToTextTable } from "@/shared/ui/Text/HeadingToText/Table/HeadingToTextTable";
import { getDataHeadingToTextProductTable } from "../lib/htt.product.lib";

import cl from './_HeadingToTextProductTable.module.scss'

interface HeadingToTextProductTableProps{
    product: IProduct
    className?: string,
}

export const HeadingToTextProductTable:FC<HeadingToTextProductTableProps> = ({product, className}) => {
    return (
        <HeadingToTextTable data={getDataHeadingToTextProductTable(product)} 
                            isShort={true} 
                            className={className} classNameHeadingItem={cl.headingItem} />
    )
}
