import { FC } from "react"
import { IProduct } from "@/entities/Product/model/product.model";
import { getDataHeadingToTextProductTable } from "@/shared/ui/Text/lib/htt.product.lib";

import cl from './_HeadingToTextProductTable.module.scss'
import { HeadingToTextTable } from "@/shared/ui/Text";
import { EHeadingToTextVariants } from "@/shared/model/text.model";

interface HeadingToTextProductTableProps{
    product: IProduct
    className?: string,
    classNameTextItem?: string,
    isShort?: boolean
}

export const HeadingToTextProductTable:FC<HeadingToTextProductTableProps> = ({product, className, isShort=true, ...rest}) => {
    return (
        <HeadingToTextTable data={getDataHeadingToTextProductTable({product})} 
                            variant={EHeadingToTextVariants.COLUMN}
                            isShort={isShort} 
                            classNameMainBlock={className} classNameHeadingItem={cl.headingItem}
                            {...rest} />
    )
}
