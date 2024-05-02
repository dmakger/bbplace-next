import { ICategoriesWithSubcategories, ICategory } from '@/entities/Metrics/model/category.metrics.model'
import cl from './_CategoryItem.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import Link from 'next/link'
import { MAIN_PAGES } from '@/config/pages-url.config'

interface ICategoryItem {
    category: ICategory | ICategoriesWithSubcategories
    className?: string,
    onMouseEnter?: Function,
    linkHref?: string
}

export const CategoryItem = ({
    category,
    className,
    onMouseEnter,
    linkHref = ''
}: ICategoryItem) => {

    const getLinkHref = (category: ICategory | ICategoriesWithSubcategories) => {
        if ('subcategories' in category) {
            if (!category.subcategories.length) {
                return `${MAIN_PAGES.CATALOG}?categoryId=${category.id}`;
            }
        }
        return linkHref;
    }

    return (
        <Link href={getLinkHref(category)} className={cls(cl.category, className)} onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, category)}>
            <span className={cl.name}>{category.name}</span>
        </Link>
    )
}
