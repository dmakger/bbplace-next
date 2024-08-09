'use client'

import cl from './_CategoryRecursiveSelect.module.scss'
import { WrapperRectangleInput } from '@/shared/ui/Wrapper/RectangleInput'
import Input from '@/shared/ui/Input/Input'
import { ERecursiveSelectVariant, IRecursiveSelectInputsArray } from '@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model'
import { IOption } from '@/shared/model/option.model'
import { useEffect, useState } from 'react'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { categoryToOption, categoryWithSubcategoriesListToOptionList } from '@/shared/lib/option/option.lib'
import { createInputArray } from '@/shared/ui/Input/ui/RecursiveSelect'
import { ICategoriesWithSubcategories } from '@/entities/Metrics/model/category.metrics.model'
import { skipToken } from '@reduxjs/toolkit/query'

interface ICategoryRecursiveSelect {
    className?: string,
    variant?: ERecursiveSelectVariant
    labelText?: string,
    classNameLabel?: string,
    defaultId?: number
    setSelectedCategoriesId?: Function,
    onClickBellowButton?: Function,

    inputsLevel?: number,
    classNamesInputArray?: string[],
    placeholdersInputsArray?: string[],


    buttonWrapperText?: string,
    isCanDisabledBellowButton?: boolean,

    isDescriptionTooltip?: boolean,
    isRequired?: boolean,
    descriptionTooltipText?: string,
    classNameDescriptionWindow?: string,
    warningTooltipText?: string,
    classNameWarningWindow?: string,
    errorInputMessage?: string
}


export const CategoryRecursiveSelect = ({
    className,
    labelText = '',
    variant = ERecursiveSelectVariant.SINGLE,
    classNameLabel,

    defaultId,
    setSelectedCategoriesId,
    onClickBellowButton,

    inputsLevel = 4,
    classNamesInputArray = [cl.firstSelect, cl.otherSelect, cl.otherSelect, cl.lastSelect],
    placeholdersInputsArray = [
        'Выберите категорию',
        'Категория второго уровня',
        'Категория третьего уровня',
        'Категория четвертого уровня'
    ],

    buttonWrapperText = '',
    isCanDisabledBellowButton,

    isDescriptionTooltip = false,
    isRequired = false,
    descriptionTooltipText = '',
    classNameDescriptionWindow,
    warningTooltipText = 'Обязательно для заполнения',
    classNameWarningWindow,
    errorInputMessage
}: ICategoryRecursiveSelect) => {

    //STATE
    const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
    const [updatedCategories, setUpdatedCategories] = useState<IOption[]>([])
    const [selectedOptionsCommonArray, setSelectedOptionsCommonArray] = useState<IOption[]>([])

    //API
    // const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery({toOption: false})
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery(defaultId !== undefined ? skipToken : {toOption: false})
    const { data: defaultCategory } = CategoryAPI.useGetCategoryByIdQuery(defaultId === undefined ? skipToken : defaultId)

    //EFFECT
    useEffect(() => {
        if (categories) {
            const options = categoryWithSubcategoriesListToOptionList(categories as ICategoriesWithSubcategories[])
            setUpdatedCategories(options ?? [])
        }
    }, [categories])

    useEffect(() => {
        if (defaultCategory) {
            const category = categoryToOption(defaultCategory)
            setSelectedOptions([category])
            setSelectedOptionsCommonArray([category])
        }
    }, [defaultCategory])

    useEffect(() => {
        setSelectedCategoriesId && setSelectedCategoriesId(selectedOptions.map(it => it.id))
    }, [selectedOptionsCommonArray])

    //INPUTS_ARRAY
    const inputsArray: IRecursiveSelectInputsArray[] = createInputArray(
        inputsLevel,
        updatedCategories,
        selectedOptionsCommonArray,
        classNamesInputArray ?? [],
        placeholdersInputsArray ?? []
    );


    return (
        <WrapperRectangleInput
            labelText={labelText}
            classNameLabel={classNameLabel}
            bellowButtonText={buttonWrapperText}
            className={className}
            isDescriptionTooltip={isDescriptionTooltip}
            isRequired={isRequired}
            descriptionTooltipText={descriptionTooltipText}
            warningTooltipText={warningTooltipText}
            classNameDescriptionWindow={classNameDescriptionWindow}
            classNameWarningWindow={classNameWarningWindow}
            onClickBellowButton={onClickBellowButton}
            errorInputMessage={errorInputMessage}
            isCanDisabledBellowButton
            // isCanDisabledBellowButton={!selectedOptions.length}
        >
            <Input.RecursiveSelect
                variantRecursive={variant}
                inputLevels={inputsArray.length}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                selectedOptionsCommonArray={selectedOptionsCommonArray}
                setSelectedOptionsCommonArray={setSelectedOptionsCommonArray}
                inputsProps={inputsArray}
                arrowSizes={{width: 16, height: 15}}

            />
        </WrapperRectangleInput>
    )
}