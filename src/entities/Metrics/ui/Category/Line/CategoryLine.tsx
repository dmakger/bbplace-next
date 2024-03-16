import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import CategoryItem from "../Item/CategoryItem"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_CategoryLine.module.scss'

interface CategoryLineProps {
    categoryList: ICategory[]
    className?: string
}

export default function CategoryLine({categoryList, className}: CategoryLineProps) {
    return (
        <div className={cls(cl.list, className)}>
            {categoryList.map(it => (
                <CategoryItem category={it} key={it.id} />
            ))}
        </div>
    )
}
