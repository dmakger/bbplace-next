'use client'

import cl from './_CategoryRecursiveSelect.module.scss'
import { WrapperRectangleInput } from '@/shared/ui/Wrapper/RectangleInput'
import Input from '@/shared/ui/Input/Input'
import { ERecursiveSelectVariant, IResursiveSelectInputsArray } from '@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model'
import { IOption } from '@/shared/model/option.model'
import { useEffect, useState } from 'react'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { getOptionsFromCategoriesWithSubcategories } from '@/shared/lib/option.lib'
import { createInputArray } from '@/shared/ui/Input/ui/RecursiveSelect'

interface ICategoryRecursiveSelect {
    className?: string,
    variant?: ERecursiveSelectVariant
    labelText?: string,
    classNameLabel?: string,
    setSelectedCategoriesId?: Function,
    onClickBellowButton?: Function,

    inputsLevel?: number,
    classNamesInputArray?: string[],
    placeholdersInputsArray?: string[],


    buttonWrapperText?: string,
    isDescriptionTooltip?: boolean,
    isRequired?: boolean,
    descriptionTooltipText?: string,
    classNameDescriptionWindow?: string,
    warningTooltipText?: string,
    classNameWarningWindow?: string,
    errorInputMessage?: string
}


export const  CategoryRecursiveSelect = ({
    className,
    labelText = '',
    variant = ERecursiveSelectVariant.SINGLE,
    classNameLabel,
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
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery()

    //EFFECT
    useEffect(() => {
        if (categories) {
            const options = getOptionsFromCategoriesWithSubcategories(categories.filter(it => it.name !== 'Нет категории'))
            setUpdatedCategories(options ?? [])
        }
    }, [categories])

    useEffect(() => {
        setSelectedCategoriesId && setSelectedCategoriesId(selectedOptions.map(it => it.id))
    }, [selectedOptionsCommonArray])



    //INPUTS_ARRAY
    const inputsArray: IResursiveSelectInputsArray[] = createInputArray(
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
            buttonText={buttonWrapperText}
            className={className}
            isDescriptionTooltip={isDescriptionTooltip}
            isRequired={isRequired}
            descriptionTooltipText={descriptionTooltipText}
            warningTooltipText={warningTooltipText}
            classNameDescriptionWindow={classNameDescriptionWindow}
            classNameWarningWindow={classNameWarningWindow}
            onClickBellowButton={onClickBellowButton}
            errorInputMessage={errorInputMessage}
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