'use client'

import cl from './_CategoryRecursiveSelect.module.scss'
import { WrapperRectangleInput } from '@/shared/ui/Wrapper/RectangleInput'
import Input from '@/shared/ui/Input/Input'
import { ERecursiveSelectVariant, IRecursiveSelectInputsArray } from '@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model'
import { IOption } from '@/shared/model/option.model'
import { useEffect, useState } from 'react'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { createInputArray } from '@/shared/ui/Input/ui/RecursiveSelect'
import { ICategoriesWithSubcategories } from '@/entities/Metrics/model/category.metrics.model'
import { categoryListToOptionWithSubcategoriesList, findOptionsWSubcategoriesByIds, findOptionsByIds } from '@/shared/lib/option/option.lib'
import { isEqual } from 'lodash'

interface ICategoryRecursiveSelect {
    className?: string,
    variant?: ERecursiveSelectVariant
    labelText?: string,
    classNameLabel?: string,
    defaultCategoriesId?: number[],
    setSelectedCategoriesAsOption?: Function,
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
    defaultCategoriesId,
    setSelectedCategoriesAsOption,
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
    const [selectedOptionsCommonArray, setSelectedOptionsCommonArray] = useState<IOption[]>([]) //Необходим для заполнения в рамках одной категории

    //API
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery({ toOption: false })
    //API
    const { data: categoryList } = CategoryAPI.useGetCategoriesByIdQuery(undefined)

    //EFFECT
    useEffect(() => {
        if (categories) {
            const options = categoryListToOptionWithSubcategoriesList(((categories as ICategoriesWithSubcategories[]).filter(it => it.name !== 'Нет категории')))
            setUpdatedCategories(options ?? [])
        }
        if (inputsLevel === 1 && categoryList) setUpdatedCategories(categoryList)
    }, [categories])


    useEffect(() => {
        if (updatedCategories && defaultCategoriesId) {
            let foundOptions: IOption[] | undefined = [];
            if (inputsLevel > 1) {
                foundOptions = findOptionsWSubcategoriesByIds(updatedCategories, defaultCategoriesId);
            } else {
                foundOptions = findOptionsByIds(updatedCategories, defaultCategoriesId);
            }
    
            // Обновляем состояние только если найденные опции отличаются от текущих
            if (!isEqual(foundOptions, selectedOptions)) {
                setSelectedOptions(foundOptions ?? []);
            }
        }
        // Этот эффект будет выполнен только при изменении updatedCategories или defaultCategoriesId
    }, [updatedCategories, defaultCategoriesId, inputsLevel]);
    
    useEffect(() => {
        // Проверяем, если переданы функции обратного вызова, и вызываем их только если selectedOptions изменились
        if (setSelectedCategoriesAsOption) {
            setSelectedCategoriesAsOption(selectedOptions);
        }
        if (setSelectedCategoriesId) {
            const newIds = selectedOptions.map(it => it.id);
            setSelectedCategoriesId(newIds);
        }
    }, [setSelectedCategoriesAsOption, setSelectedCategoriesId, selectedOptions]);


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
                arrowSizes={{ width: 16, height: 15 }}

            />
        </WrapperRectangleInput>
    )
}
