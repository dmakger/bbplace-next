import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductLKList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ProductLK } from '../..'
import { EProductLKVariants } from '../../model/productLK.model'
import { IGroupProducts } from '@/entities/Product/model/group.product.model'

interface IProductLKList {
    className?: string,
    variant?: EProductLKVariants
    products: IGroupProducts[] | IProduct[],
    choosenProduct?: IGroupProducts,
    setChoosenProduct?: Function,
    setIsOpenSettings?: Function,
    isOpenGroup?: boolean,
    setIsOpenGroup?: Function,
    checkedProductsId?: number[],
    setCheckedProductsId?: Function
}

export const ProductLKList = ({
    className,
    products,
    variant = EProductLKVariants.DEFAULT,
    ...rest
}: IProductLKList) => {
    return (
        <div className={cls(cl.LKProductList, className)}>
            {products.map(it => (
                <ProductLK product={it}
                    key={it.id}
                    variant={variant}
                    {...rest} />
            ))}
        </div>
    )
}
