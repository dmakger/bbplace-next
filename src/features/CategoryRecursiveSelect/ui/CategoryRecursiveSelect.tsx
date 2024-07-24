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
    const [selectedoptions, setselectedoptions] = useState<IOption[]>([])
    const [updatedCategories, setUpdatedCategories] = useState<IOption[]>([])
    const [selectedoptionsCommonArray, setselectedoptionsCommonArray] = useState<IOption[]>([])

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
        setSelectedCategoriesId && setSelectedCategoriesId(selectedoptions.map(it => it.id))
    }, [selectedoptionsCommonArray])



    //INPUTS_ARRAY
    const inputsArray: IResursiveSelectInputsArray[] = createInputArray(
        inputsLevel,
        updatedCategories,
        selectedoptionsCommonArray,
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
                selectedoptions={selectedoptions}
                setselectedoptions={setselectedoptions}
                selectedoptionsCommonArray={selectedoptionsCommonArray}
                setselectedoptionsCommonArray={setselectedoptionsCommonArray}
                inputsProps={inputsArray}
                arrowSizes={{width: 16, height: 15}}

            />
        </WrapperRectangleInput>
    )
}
