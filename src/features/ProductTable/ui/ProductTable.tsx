import { productApiItemToProduct } from '@/entities/Product/lib/product.lib'
import cl from './_ProductTable.module.scss'
import { IProductAPI } from '@/entities/Product/model/product.model'
import { HeadingToTextTable } from "@/shared/ui/Text/HeadingToText/Table/HeadingToTextTable"
import { getDataHeadingToTextProductMainTable } from "@/widgets/Product/Table/HeadingToText/lib/htt.product.lib"

interface IProductTable {
    productApi: IProductAPI
}
export const ProductTable = ({
    productApi
}: IProductTable) => {
    return (
        <HeadingToTextTable
            data={getDataHeadingToTextProductMainTable(productApiItemToProduct(productApi))}
            hasColon={false}
            classNameMainBlock={cl.Table}
            classNameHeadingItem={cl.headingItem}
            classNameTextItem={cl.textItem}
        />
    )
}
