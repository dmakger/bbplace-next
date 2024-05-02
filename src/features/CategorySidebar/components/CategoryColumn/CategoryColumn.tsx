import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_CategoryColumn.module.scss'
import { ICategoriesWithSubcategories } from "@/entities/Metrics/model/category.metrics.model"

interface ICategoryColumn {
    categories: ICategoriesWithSubcategories[]
    onHover: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
}

export const CategoryColumn = ({
    categories,
    onHover
}: ICategoryColumn) => {

    

    return (
        <div className={cl.CategoryColumn}>
            {categories && categories.map(it => (
                <Button variant={ButtonVariant.ALMOST_RECTANGULAR}
                    key={it.id}
                    classNameButton={cl.button}
                    onMouseEnter={onHover}>
                    {it.name}
                </Button>
            ))}
        </div>
    )
}
