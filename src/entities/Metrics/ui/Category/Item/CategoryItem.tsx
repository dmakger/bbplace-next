import { ICategory } from '@/entities/Metrics/model/category.metrics.model'
import cl from './_CategoryItem.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import Link from 'next/link'

interface CategoryItemProps {
    category: ICategory
    className?: string
}

export default function CategoryItem({category, className}: CategoryItemProps) {
    return (
        <Link href={''}  className={cls(cl.category, className)}>
            <span className={cl.name}>{category.name}</span>
        </Link>
    )
}
