import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_CategoryLine.module.scss'
import { CategoryItem } from ".."

interface CategoryLineProps {
    categoryList: ICategory[]
    className?: string
}

export const CategoryLine = ({ categoryList, className }: CategoryLineProps) => {
    return (
        <div className={cls(cl.list, className)}>
            {categoryList.map(it => (
                <CategoryItem category={it} key={it.id} />
            ))}
        </div>
    )
}
