import { ICategoriesWithSubcategories, ICategory } from '@/entities/Metrics/model/category.metrics.model'
import cl from './_CategoryItem.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import Link from 'next/link'
import { MAIN_PAGES } from '@/config/pages-url.config'

interface ICategoryItem {
    category: ICategory | ICategoriesWithSubcategories
    className?: string,
    onMouseEnter?: Function,
    linkHref?: string,
    hasSubcategories?: boolean,
    toggleShowCategories?: Function
}

export const CategoryItem = ({
    category,
    className,
    onMouseEnter = () => {},
    linkHref = '',
    hasSubcategories,
    toggleShowCategories
}: ICategoryItem) => {

    const getLinkHref = (category: ICategory | ICategoriesWithSubcategories) => {
        // if ('subcategories' in category) {
        //     if (!category.subcategories.length) {                
                // ВМЕСТО: `${MAIN_PAGES.PRODUCTS.path}?category=${category.id}`;
                return `${MAIN_PAGES.PRODUCTS}?category=${category.id}`;
        //     }
        // }
        // return linkHref;
    }

    const hideCategoriesSidebar = () => {
        toggleShowCategories && toggleShowCategories(false)
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(onMouseEnter) onMouseEnter(e, category)
    }

    return (
        <Link href={getLinkHref(category)} className={cls(cl.category, className)} onMouseEnter={handleMouseEnter} onClick={hideCategoriesSidebar}>
            <span className={cl.name}>{category.name}</span>
        </Link>
    )
}
