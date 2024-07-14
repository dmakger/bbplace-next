import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductSingleCreationPage.module.scss'
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect"

interface IProductSingleCreationPage {
    className?: string,
}

export const ProductSingleCreationPage = ({ className }: IProductSingleCreationPage) => {

    return (
        <div className={cls(cl.ProductSingleCreationPage, className)}>
            <CategoryRecursiveSelect
                labelText="Категория"
                isRequired
                isDescriptionTooltip
                descriptionTooltipText='Выберите категорию из списка'
                classNameDescriptionWindow={cl.descriptionTooltip}/>
        </div>
    )
}
