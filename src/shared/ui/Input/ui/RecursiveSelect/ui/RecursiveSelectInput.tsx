'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_RecursiveSelectInput.module.scss'
import { IOption } from "@/shared/model/option.model"
import { EInputVariants } from "../../../model/input.model"
import { IImageSizes } from "@/shared/model/image.model"
import Input from "../../../Input"
import { useState } from "react"
import { IWrapperRectangleInputChildren } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { ERecursiveSelectVariant, IResursiveSelectInputsArray } from "../model/recursiveSelect.model"
import { OptionsAttachmentItem } from "@/shared/ui/Form/OptionsAttachment/ui/Item/OptionsAttachmentItem"
import { EOptionsAttachmentSize } from "@/shared/ui/Form/OptionsAttachment/data/optionsAttachment.data"

interface IRecursiveSelectInput extends IWrapperRectangleInputChildren {
    className?: string,
    variant?: EInputVariants,
    variantRecursive?: ERecursiveSelectVariant,
    arrowSizes?: IImageSizes,
    inputLevels: number,
    inputsProps: IResursiveSelectInputsArray[],
    selectedOptionsCommonArray: IOption[],
    setSelectedOptionsCommonArray: Function,
    selectedOptions: IOption[],
    setSelectedOptions: Function
}

export const RecursiveSelectInput = ({
    variant = EInputVariants.RECTANGULAR,
    variantRecursive = ERecursiveSelectVariant.SINGLE,
    className,
    arrowSizes = {
        width: 10,
        height: 10
    },
    selectedOptionsCommonArray,
    setSelectedOptionsCommonArray,
    selectedOptions,
    setSelectedOptions,
    inputsProps,
    setWarning,
    success,
    setSelectedOptionsArray,
    setSuccess

}: IRecursiveSelectInput) => {

    //STATE
    const [deletingOption, setDeletingOption] = useState<number>()

    //FUNCTION
    const addSelectedOption = (option: IOption, level: number) => {
        const newSelectedOptionsCategory = [...selectedOptionsCommonArray]

        newSelectedOptionsCategory[level] = option

        newSelectedOptionsCategory.length = level + 1

        setSelectedOptionsCommonArray(newSelectedOptionsCategory)


        if (!option.options?.length && !selectedOptions.find(it => it.id === option.id)) {
            if (variantRecursive == ERecursiveSelectVariant.SINGLE) return setSelectedOptions([option]);

            setSelectedOptions([...selectedOptions, option])
            setSelectedOptionsArray && setSelectedOptionsArray([...selectedOptions, option]) //Для связи с WrapperRectangleInput
            setSelectedOptionsCommonArray([])
        }
    }

    const handleDeleteItem = (option: IOption) => {
        setDeletingOption(option.id)
        setTimeout(() => { // Для плавной анимации добавления и удаления OptionsAttachmentItem
            const updatedSelectedOptions = selectedOptions.filter(item => item.id !== option.id);

            setSelectedOptions(updatedSelectedOptions)
            if(variantRecursive === ERecursiveSelectVariant.SINGLE){
                setSelectedOptionsCommonArray([])
                setSuccess && setSuccess(false)
            }
            setSelectedOptionsArray && setSelectedOptionsArray(updatedSelectedOptions) //Для связи с WrapperRectangleInput
            setDeletingOption(0)
        }, 300)
    }


    //RENDER_SELECT
    const renderSelect = (options: IOption[], placeholder: string, defaultOption: IOption | undefined, level: number, className?: string) => (
        <Input.TextAndSelect
            variantRecursive={variantRecursive}
            options={options}
            placeholder={placeholder}
            defaultOption={defaultOption}
            variant={variant}
            arrowSizes={arrowSizes}
            classNameMainInput={className}
            disabled={!options.length}
            onClickOption={(option: IOption) => addSelectedOption(option, level)}
            key={level}
            success={success}
            setSuccess={setSuccess}
            setWarning={setWarning}
        />
    )

    return (
        <div className={cls(cl.RecursiveSelect, cl[variant], className)}>
            {(variantRecursive === ERecursiveSelectVariant.SINGLE ? !selectedOptions.length : true) && inputsProps.map((inputProps, index) => (
                renderSelect(
                    inputProps.currentOptions,
                    inputProps.placeholder,
                    selectedOptionsCommonArray[index],
                    index,
                    inputProps.className
                )
            ))}

            {selectedOptions.length > 0 && <div className={cl.optionsContainer}>
                {selectedOptions.map(option => (
                    <OptionsAttachmentItem
                        size={EOptionsAttachmentSize.BIG}
                        className={cls(cl.optionsAttachmentShow, deletingOption === option.id ? cl.optionsAttachmentHide : '')}
                        key={option.id}
                        title={option.name}
                        handleDelete={() => handleDeleteItem(option)}
                    />
                ))}
            </div>}
        </div>
    )
}
