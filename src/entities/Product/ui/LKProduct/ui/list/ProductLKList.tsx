import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'
import { EProductLKVariants } from '../../model/productLK.model'

interface IProductLKList{
    className?: string,
    variant?: EProductLKVariants
    products: IProduct[],
    choosenProduct?: IProduct,
    setGroupProducts?: Function,
    setChoosenProduct?: Function,
    setIsOpenSettings?: Function,
    isOpenGroup?: boolean,
    setIsOpenGroup?: Function,
    checkedProductsId?: number[],
    setсheckedProducts?: Function
}

export const ProductLKList = ({
    className,
    variant = EProductLKVariants.DEFAULT,
    products,
    setGroupProducts,
    choosenProduct,
    setChoosenProduct,
    setIsOpenSettings,
    isOpenGroup,
    setIsOpenGroup,
    checkedProductsId,
    setсheckedProducts
}:IProductLKList) => {
  return (
      <div className={cls(cl.LKProductList, className)}>
          {products.map(it => (
              <ProductLK product={it}
                  key={it.id}
                  variant={variant}
                  setGroupProducts={setGroupProducts}
                  isOpenGroup={isOpenGroup}
                  setIsOpenGroup={setIsOpenGroup}
                  setIsOpenSettings={setIsOpenSettings}
                  choosenProduct={choosenProduct}
                  setChoosenProduct={setChoosenProduct}
                  checkedProductsId={checkedProductsId}
                  setсheckedProducts={setсheckedProducts} />
          ))}
      </div>
  )
}
