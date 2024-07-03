import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'
import { EProductLKVariants } from '../../model/productLK.model'

interface IProductLKList{
    className?: string,
    products: IProduct[],
    variant: EProductLKVariants,
    setGroupProducts?: Function
}

export const ProductLKList = ({
    className,
    products,
    variant = EProductLKVariants.DEFAULT,
    setGroupProducts
}:IProductLKList) => {
  return (
    <div className={cls(cl.LKProductList, className)}>
        {products.map(it => (
            <ProductLK product={it} variant={variant} setGroupProducts={setGroupProducts}/>
        ))}
    </div>
  )
}
