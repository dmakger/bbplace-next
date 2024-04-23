import { productApiItemToProduct } from '@/entities/Product/lib/product.lib'
import cl from './_ProductTable.module.scss'
import { IProductAPI } from '@/entities/Product/model/product.model'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { getDataHeadingToTextProductMainTable } from '@/widgets/Product/Table/HeadingToText/lib/htt.product.lib'
import { EHeadingToTextVariants } from '@/shared/ui/Text/model/text.model'

interface IProductTable {
    productApi: IProductAPI
}
export const ProductTable = ({
    productApi
}: IProductTable) => {
    return (
        <HeadingToTextTable
            variant={EHeadingToTextVariants.ROW}
            data={getDataHeadingToTextProductMainTable(productApiItemToProduct(productApi))}
            hasColon={false}
            classNameMainBlock={cl.Table}
            classNameHeadingItem={cl.headingItem}
            classNameTextItem={cl.textItem}
        />
    )
}
