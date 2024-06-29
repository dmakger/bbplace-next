'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_MultipleCreationForm.module.scss'
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api"
import { useEffect, useState } from "react"
import { IOption } from "@/shared/model/option.model"
import { getOptionsFromCategoriesWithSubcategories } from "@/shared/lib/option.lib"
import Input from "@/shared/ui/Input/Input"

interface IMultipleCreationForm {
    className?: string,

}

export const MultipleCreationForm = ({
    className
}: IMultipleCreationForm) => {

    //STATE
    const [updatedCategories, setUpdatedCategories] = useState<IOption[]>()

    //API
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery()

    useEffect(() => {
        if (categories)
            setUpdatedCategories(getOptionsFromCategoriesWithSubcategories(categories))
    }, [categories])


    return (
        <div className={cls(cl.MultipleCreationForm, className)}>
            <WrapperRectangleInput
                labelText='1. Генерация шаблона'
                classNameLabel={cl.label}
                buttonText="Скачать шаблон"
            >
                <Input.RecursiveSelect options={updatedCategories ?? []}/>
            </WrapperRectangleInput>
        </div>
    )
}
