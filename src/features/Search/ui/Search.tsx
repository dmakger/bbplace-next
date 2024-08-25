'use client'

import { FormEvent, useRef } from "react";
import cl from './_Search.module.scss'
import Input from "@/shared/ui/Input/Input";
import { PTCSelect } from "@/features/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/storage/hooks";
import { getFormDataFromForm } from "@/shared/lib/formData.lib";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { SEARCH__ICON } from "@/shared/ui/Icon/data/search.data.icon";


export const Search = () => {
    return (
        <SuspenseL>
            <SearchChild />
        </SuspenseL>
    )
}

const SearchChild = () => {

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
        const data = getFormDataFromForm(formRef.current)
        if (data.search !== '') {
            const searchString = new URLSearchParams;
            searchParams.forEach((value, key) =>
                searchString.append(key, value)
            )
            searchString.set('search', data.search)
            router.push(`${window.location.origin}/${view}?${searchString.toString()}`);
        }
    }

    return (
        <form className={cl.search} onSubmit={handleOnSubmit} ref={formRef}>
            <PTCSelect classNameTitle={cl.select} classNameButton={cl.buttonSelect}/>
            <Input.Text name={'search'} placeholder="Поиск..." className={cl.text}/>
            <Button variant={ButtonVariant.DEFAULT} 
                    afterImage={SEARCH__ICON} afterProps={{width: 19, height: 19}} 
                    className={cl.button} />
        </form>
    )
}

