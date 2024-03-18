'use client'

import cl from './_Sort.module.scss'
import Input from "@/shared/ui/Input/Input"
import { DEFAULT_SORT, sortOptions } from "../data/sort.data"
import { FormEvent, useRef, useState } from 'react'
import { IOption } from '@/shared/model/option.model'

export const Sort = () => {

    //STATE
    const [sortByDate, setSortByDate] = useState<IOption>()

    //REF
    const sortForm = useRef<HTMLFormElement>(null)

    const addSortOption = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (sortForm.current) {
            const formData = new FormData(sortForm.current)
            const tempDataStorage: Record<string, any> = {}
            formData.forEach((value, key) => tempDataStorage[key] = value)
            setSortByDate(tempDataStorage['selectSort'])            
        }
    }



    return (
        <form className={cl.Sort} ref={sortForm} onChange={addSortOption}>
            <h3>
                Сортировка
            </h3>
            <Input.Select
                name='selectSort'
                options={sortOptions}
                defaultOption={DEFAULT_SORT}
                classNameTitle={cl.sortSelect}
                width={14}
                height={12}
            />
        </form>
    )
}
