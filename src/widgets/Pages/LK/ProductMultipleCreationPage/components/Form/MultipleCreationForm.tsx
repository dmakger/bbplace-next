'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_MultipleCreationForm.module.scss'
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput"
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api"
import { useEffect, useState } from "react"
import { IOption } from "@/shared/model/option.model"
import { getOptionsFromCategoriesWithSubcategories } from "@/shared/lib/option.lib"
import Input from "@/shared/ui/Input/Input"
import { WrapperGrayButton } from "@/shared/ui/Wrapper/GrayButton"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonSize } from "@/shared/ui/Button/model/button.model"
import { IResursiveSelectInputs } from "@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model"
import { createInputArray } from "@/shared/ui/Input/ui/RecursiveSelect"

interface IMultipleCreationForm {
    className?: string,

}

export const MultipleCreationForm = ({
    className
}: IMultipleCreationForm) => {

    //STATE
    const [updatedCategories, setUpdatedCategories] = useState<IOption[]>([])
    const [selectedOptionsCommonArray, setSelectedOptionsCommonArray] = useState<IOption[]>([])

    //API
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery()

    //EFFECT
    useEffect(() => {
        if (categories) {
            const options = getOptionsFromCategoriesWithSubcategories(categories)
            setUpdatedCategories(options ?? [])
        }
    }, [categories])

    //INPUTS_ARRAY
    const inputLevels = 4;
    const classNames = [cl.firstSelect, cl.otherSelect, cl.otherSelect, cl.lastSelect];
    const placeholders = [
        'Выберите категорию', 
        'Категория второго уровня', 
        'Категория третьего уровня', 
        'Категория четвертого уровня'
    ];

    const inputsArray: IResursiveSelectInputs[] = createInputArray(
        inputLevels,
        updatedCategories,
        selectedOptionsCommonArray,
        classNames,
        placeholders
    );

    return (
        <div className={cls(cl.MultipleCreationForm, className)}>
            <WrapperRectangleInput
                labelText='1. Генерация шаблона'
                classNameLabel={cl.label}
                buttonText="Скачать шаблон"
            >
                <Input.RecursiveSelect
                    inputLevels={inputsArray.length}
                    selectedOptionsCommonArray={selectedOptionsCommonArray}
                    setSelectedOptionsCommonArray={setSelectedOptionsCommonArray}
                    inputsProps={inputsArray}
                />
            </WrapperRectangleInput>
            <WrapperGrayButton labelText="2.">
                <Button title="Загрузить таблицу"
                    variant={ButtonVariant.FILL}
                    size={ButtonSize.Big} />
            </WrapperGrayButton>
        </div>
    )
}
