import { FC } from "react"
import cl from './_Sort.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import Input from "@/shared/ui/Input/Input"
import { DEFAULT_SORT, sortOptions } from "../data/sort.data"

interface ISort{
    className?: string,

}

export const Sort:FC<ISort> = ({className}) => {
    return (
        <div className={cls(cl.Sort, className)}>
            <h3>
                Сортировка
            </h3>
            <Input.Select
                options={sortOptions}
                defaultOption={DEFAULT_SORT}
                classNameTitle={cl.sortSelect}
                width={14}
                height={12}
            />
        </div>
    )
}
