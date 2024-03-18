import cl from './_SortFilterSidebar.module.scss'
import { Sort } from "@/features/Sort"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Filter } from "@/features/Filter"


export const SortFilterSidebar = () => {
    return (
        <aside className={cl.SortFilterSidebar}>
            <Sort />
            <Filter />
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE}>
                Подписаться
            </Button>
        </aside>
    )
}
