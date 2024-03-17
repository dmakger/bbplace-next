import { FC } from "react"
import cl from './_SortFilterSidebar.module.scss'
import { Sort } from "@/features/Sort"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"
import { cls } from "@/shared/lib/classes.lib"

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
