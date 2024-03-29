import { FC } from "react"
import cl from './_SortFilterSidebar.module.scss'
import { cls } from "@/shared/lib/classes.data"
import { Sort } from "@/features/Sort"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"

interface ISortFilterSidebar{
    className?: string,

}

export const SortFilterSidebar:FC<ISortFilterSidebar> = ({className}) => {
    return (
        <aside className={cls(cl.SortFilterSidebar, className)}>
            <Sort/>
            <Filter/>
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE}>
                Подписаться
            </Button>
        </aside>
    )
}
