import { FC } from "react"
import { IProduct } from "@/entities/Product/model/product.model";
import { getDataHeadingToTextProductTable } from "../lib/htt.product.lib";

import cl from './_HeadingToTextProductTable.module.scss'
import { HeadingToTextColumn, HeadingToTextTable } from "@/shared/ui/Text";
import { EHeadingToTextVariants } from "@/shared/ui/Text/model/text.model";

interface HeadingToTextProductTableProps{
    product: IProduct
    className?: string,
}

export const HeadingToTextProductTable:FC<HeadingToTextProductTableProps> = ({product, className}) => {
    return (
        <HeadingToTextTable data={getDataHeadingToTextProductTable(product)} 
                            variant={EHeadingToTextVariants.COLUMN}
                            isShort={true} 
                            classNameMainBlock={className} classNameHeadingItem={cl.headingItem} />
    )
}
