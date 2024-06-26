import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'
import { EProductLKVariants } from '../../model/productLK.model'

interface IProductLKList{
    className?: string,
    variant?: EProductLKVariants
    products: IProduct[],
    setGroupProducts?: Function,
    setChoosenProduct?: Function,
    setIsOpenSettings?: Function,
    setIsOpenGroup?: Function
}

export const ProductLKList = ({
    className,
    variant = EProductLKVariants.DEFAULT,
    products,
    setGroupProducts,
    setChoosenProduct,
    setIsOpenSettings,
    setIsOpenGroup
}:IProductLKList) => {
  return (
      <div className={cls(cl.LKProductList, className)}>
          {products.map(it => (
              <ProductLK product={it}
                  key={it.id}
                  variant={variant}
                  setGroupProducts={setGroupProducts}
                  setIsOpenGroup={setIsOpenGroup}
                  setIsOpenSettings={setIsOpenSettings}
                  setChoosenProduct={setChoosenProduct} />
          ))}
      </div>
  )
}
