'use client'

import { FormEvent, useRef } from "react";
import cl from './_Search.module.scss'
import Input from "@/shared/ui/Input/Input";
import ButtonSearch from "@/shared/ui/Button/Search/ButtonSearch";
import { PTCSelect } from "@/features/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/storage/hooks";
import { getFormData } from "@/shared/lib/formData.lib";

export const Search = () => {

    //STATE
    const { view } = useAppSelector(state => state.ptc)

    //REF
    const formRef = useRef<HTMLFormElement>(null)
    const searchParams = useSearchParams();

    //ROUTER
    const router = useRouter()

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        const data = getFormData(formRef.current)
        if (data.search !== '') {
            const searchString = new URLSearchParams;
            searchParams.forEach((value, key) =>
                searchString.append(key, value)
            )
            searchString.set('search', data.search)
            router.push(`${view}?${searchString.toString()}`);
        }
    }

    return (
        <form className={cl.search} onSubmit={handleOnSubmit} ref={formRef}>
            <PTCSelect classNameTitle={cl.select} classNameButton={cl.buttonSelect}/>
            <Input.Text name={'search'} placeholder="Поиск..." className={cl.text} />
            <ButtonSearch className={cl.button} />
        </form>
    )
}
