import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductSingleCreationPage.module.scss'

interface IProductSingleCreationPage{
    className?: string,

}

export const ProductSingleCreationPage = ({className}: IProductSingleCreationPage) => {
    return (
        <div className={cls(cl.ProductSingleCreationPage, className)}>

        </div>
    )
}
