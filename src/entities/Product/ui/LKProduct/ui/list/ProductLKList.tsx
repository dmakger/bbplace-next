import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'

interface IProductLKList{
    className?: string,
    products: IProduct[],
    setIsOpenModal: Function
}

export const ProductLKList = ({
    className,
    products,
    setIsOpenModal
}:IProductLKList) => {
  return (
    <div className={cls(cl.LKProductList, className)}>
        {products.map(it => (
            <ProductLK product={it} setIsOpenModal={setIsOpenModal}/>
        ))}
    </div>
  )
}
