'use client'

import { FC, useState } from "react"
import { cls } from "@/shared/lib/classes.data"
import cl from './_Filter.module.scss'
import Image from "next/image"

interface IFilterProps{
    className?: string,

}

export const Filter: FC<IFilterProps> = ({ className }) => {

    //STATE
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)

    return (
        <div className={cls(cl.Filter, className)}>
            <button type={'button'} className={cls(cl.button, className)}>
                <h3>
                    Фильтры
                </h3>
                <Image src={'arrow.svg'} alt={'arrow'} width={14} height={12}/>
            </button>
        </div>
    )
}
