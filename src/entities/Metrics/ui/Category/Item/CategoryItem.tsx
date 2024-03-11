import { ICategory } from '@/entities/Metrics/model/category.metrics.model'
import cl from './_CategoryItem.module.scss'
import { cls } from '@/shared/lib/classes.data'

interface CategoryItemProps {
    category: ICategory
    className?: string
}

export default function CategoryItem({category, className}: CategoryItemProps) {
    return (
        <div className={cls(cl.category, className)}>
            <span className={cl.name}>{category.name}</span>
        </div>
    )
}
