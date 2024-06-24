import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'
import { EProductLKVariants } from '../../model/productLK.model'

interface IProductLKList{
    className?: string,
    variant?: EProductLKVariants
    products: IProduct[],
}

export const ProductLKList = ({
    className,
    variant = EProductLKVariants.DEFAULT,
    products,
}:IProductLKList) => {
  return (
    <div className={cls(cl.LKProductList, className)}>
        {products.map(it => (
            <ProductLK product={it}
             variant={variant}/>
        ))}
    </div>
  )
}
