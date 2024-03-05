import {FormEvent} from "react";
import cl from './_Search.module.scss'
import Input from "@/shared/ui/Input/Input";
import ButtonSearch from "@/shared/ui/Button/Search/ButtonSearch";
import PTCSelect from "@/features/Select/PTC/PTCSelect";

export default async function Search() {
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        console.log(formData, e.currentTarget, e.currentTarget.value)
    }

    return (
        // <form onSubmit={handleOnSubmit} className={cl.search}>
        <form className={cl.search}>
            <PTCSelect />
            <Input.Text name={'search'} placeholder="Поиск..." className={cl.text} />
            <ButtonSearch className={cl.button} />
        </form>
    )
}
