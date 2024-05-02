import { CategoryItem } from '@/entities/Metrics/ui/Category'
import cl from './_CategoryColumn.module.scss'
import { ICategoriesWithSubcategories } from "@/entities/Metrics/model/category.metrics.model"

interface ICategoryColumn {
    categories: ICategoriesWithSubcategories[]
    onHover: Function
}

export const CategoryColumn = ({
    categories,
    onHover
}: ICategoryColumn) => {

    return (
        <div className={cl.CategoryColumn}>
            {categories && categories.map(it => (
                <CategoryItem
                    key={it.id}
                    category={it}
                    className={cl.categoryItem}
                    onMouseEnter={onHover} />
            ))}
        </div>
    )
}
