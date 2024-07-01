'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_RecursiveSelectInput.module.scss'
import { IOption } from "@/shared/model/option.model"
import { EInputVariants } from "../../../model/input.model"
import { IImageSizes } from "@/shared/model/image.model"
import Input from "../../../Input"
import { useState } from "react"
import { OptionsAttachmentItem } from "@/shared/ui/Form/OptionsAttachmentItem"
import { EOptionsAttachmentSize } from "@/shared/ui/Form/OptionsAttachmentItem/model/optionsAttachment.model"
import { IWrapperRectangleInputChildren } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model"
import { IResursiveSelectInputsArray } from "../model/recursiveSelect.model"

interface IRecursiveSelectInput extends IWrapperRectangleInputChildren {
    className?: string,
    variant?: EInputVariants,
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

    const addSelectedOption = (option: IOption, level: number) => {
        const newSelectedOptionsCategory = [...selectedOptionsCommonArray]

        newSelectedOptionsCategory[level] = option

        newSelectedOptionsCategory.length = level + 1

        setSelectedOptionsCommonArray(newSelectedOptionsCategory)

        if (!option.options?.length && !selectedOptions.find(it => it.id === option.id)) {
            setSelectedOptions([...selectedOptions, option])
            setSelectedOptionsArray && setSelectedOptionsArray([...selectedOptions, option]) //Для связи с WrapperRectangleInput
            setSelectedOptionsCommonArray([])
        }
    }

    const handleDeleteItem = (option: IOption) => {
        setDeletingOption(option.id)
        setTimeout(() => {
            setSelectedOptions((prevSelectedOptions: IOption[]) =>
                prevSelectedOptions.filter(item => item.id !== option.id)
            )
            setSelectedOptionsArray && setSelectedOptionsArray(selectedOptions.filter(item => item.id !== option.id)) //Для связи с WrapperRectangleInput
            setDeletingOption(0)
        }, 300)
    }


    //RENDER_SELECT
    const renderSelect = (options: IOption[], placeholder: string, defaultOption: IOption | undefined, level: number, className?: string) => (
        <Input.TextAndSelect
            listOptions={options}
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
            {inputsProps.map((inputProps, index) => (
                renderSelect(
                    inputProps.currentOptions,
                    inputProps.placeholder,
                    selectedOptionsCommonArray[index],
                    index,
                    inputProps.className
                )
            ))}

            <div className={cl.optionsContainer}>
                {selectedOptions.map(option => (
                    <OptionsAttachmentItem
                        size={EOptionsAttachmentSize.MEDIUM}
                        className={cls(cl.optionsAttachmentShow, deletingOption === option.id ? cl.optionsAttachmentHide : '')}
                        key={option.id}
                        title={option.name}
                        handleDelete={() => handleDeleteItem(option)}
                    />
                ))}
            </div>
        </div>
    )
}
