import { IProduct } from '@/entities/Product/model/product.model'
import cl from './_ProductASCList.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { EViewProduct } from '@/entities/Product/model/view.product.model'
import { Product } from '../../../Product'
import { Button, ButtonVariant } from '@/shared/ui/Button'


interface IProductASCList{
    products: IProduct[],
    link?: string,
    className?: string,
}

export const ProductASCList= ({products, link, className}: IProductASCList) => {
    return (
        <div className={cls(cl.list, className)}>
            {products.map((product, index) => (
                index < 3 && <Product  product={product} view={EViewProduct.AT_SUPPLIER_CARD} className={cl.product} key={product.id} />
            ))}
            {products.length > 2 && <Button variant={ButtonVariant.BACKGROUND_RED_HUGE} href={link}>
                Все товары
            </Button>}
        </div>
    )
}
