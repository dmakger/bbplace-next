import { CategoryItem } from '@/entities/Metrics/ui/Category'
import cl from './_CategoryColumn.module.scss'
import { ICategoriesWithSubcategories } from "@/entities/Metrics/model/category.metrics.model"
import { cls } from '@/shared/lib/classes.lib'

interface ICategoryColumn {
    className?: string,
    categories: ICategoriesWithSubcategories[]
    onHover: Function
}

export const CategoryColumn = ({
    className,
    categories,
    onHover
}: ICategoryColumn) => {

    return (
        <div className={cls(cl.CategoryColumn, className)}>
            {categories && categories.map(it => (
                <CategoryItem
                    key={it.id}
                    category={it}
                    className={cl.categoryItem}
                    onMouseEnter={onHover}
                    hasSubcategories={!!it.subcategories.length} />
            ))}
        </div>
    )
}
