import { FC } from "react"
import { IProduct } from "@/entities/Product/model/product.model";
import { getDataHeadingToTextProductTable } from "../lib/htt.product.lib";

import cl from './_HeadingToTextProductTable.module.scss'
import { HeadingToTextTable } from "@/shared/ui/Text";
import { EHeadingToTextVariants } from "@/shared/model/text.model";

interface HeadingToTextProductTableProps{
    product: IProduct
    className?: string,
    classNameTextItem?: string,
}

export const HeadingToTextProductTable:FC<HeadingToTextProductTableProps> = ({product, className, ...rest}) => {
    return (
        <HeadingToTextTable data={getDataHeadingToTextProductTable(product)} 
                            variant={EHeadingToTextVariants.COLUMN}
                            isShort={true} 
                            classNameMainBlock={className} classNameHeadingItem={cl.headingItem} />
    )
}
