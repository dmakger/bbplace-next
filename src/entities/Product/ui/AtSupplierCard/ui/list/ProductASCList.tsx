import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductASCList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { EViewProduct } from '@/entities/Product/model/view.product.model'
import { Product } from '../../../Product'


interface IProductASCList{
    products: IProduct[]
    className?: string,
}

export const ProductASCList= ({products, className}: IProductASCList) => {
    return (
        <div className={cls(cl.list, className)}>
            {products.map(product => (
                <Product product={product} view={EViewProduct.AT_SUPPLIER_CARD} className={cl.product} key={product.id} />
            ))}
        </div>
    )
}
