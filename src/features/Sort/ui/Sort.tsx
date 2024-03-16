import { FC } from "react"
import cl from './_Sort.module.scss'
import { cls } from "@/shared/lib/classes.data"

interface ISort{
    className?: string,

}

export const Sort:FC<ISort> = ({className}) => {
    return (
        <div className={cls(cl.Sort, className)}>
            <h3>
                Сортировка
            </h3>
        </div>
    )
}
