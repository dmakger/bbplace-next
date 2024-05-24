import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductASPList.module.scss'
import { IProduct } from "@/entities/Product/model/product.model"
import { ProductASP } from "../.."

interface IProductASPList{
    className?: string,
    products: IProduct[],

}

export const ProductASPList = ({
    className,
    products
}:IProductASPList) => {
    return (
        <div className={cls(cl.list, className)}>
            {products.map(product => (
                <ProductASP product={product}/>
            ))}
        </div>
    )
}
