import { cls } from "@/shared/lib/classes.lib"
import cl from './_THeadRow.module.scss'
import { TCellButtonItem } from "../TCellButtonItem/TCellButtonItem"
import { ETCellVariants, ITCellButtonItem } from "../../model/tariffs.model"

interface ITHeadRow {
    className?: string,

}

export const THeadRow = ({ className }: ITHeadRow) => {

    const THEAD_ITEM_ARRAY: ITCellButtonItem[] = [
        { title: '', classNameData: 'firstDefaultItem' },
        { title: 'Демо', subtitle: 'Бесплатно', variant: ETCellVariants.DEMO },
        { title: 'Бизнес', buttonTitle: 'от 2 090₽/месяц', variant: ETCellVariants.BUSINESS },
        { title: 'Премиум', buttonTitle: 'от 2 890₽/месяц', variant: ETCellVariants.PREMIUM },




    ]
    return (
        <thead className={cls(cl.THeadRow, className)}>
            {THEAD_ITEM_ARRAY.map(it => (
                <TCellButtonItem
                    buttonTitle={it.buttonTitle}
                    title={it.title}
                    subtitle={it.subtitle}
                    variant={it.variant}
                />
            ))}

        </thead>
    )
}
