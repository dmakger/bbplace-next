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

interface IRecursiveSelectInput extends IWrapperRectangleInputChildren{
    className?: string,
    variant?: EInputVariants
    options: IOption[]
    arrowSizes?: IImageSizes,
}

export const RecursiveSelectInput = ({
    variant = EInputVariants.RECTANGULAR,
    className,
    options,
    arrowSizes = {
        width: 10,
        height: 10
    },
    success,
    setSelectedOptionsArray,
    setSuccess

}: IRecursiveSelectInput) => {

    //STATE
    const [selectedOptionsCategory, setSelectedOptionsCategory] = useState<IOption[]>([])
    const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const addSelectedOption = (option: IOption) => {
        if (!selectedOptionsCategory.find(item => item.id === option.id)) {
            setSelectedOptionsCategory([...selectedOptionsCategory, option])


            if (!option.options?.length) {
                setSelectedOptions([...selectedOptions, option])
                setSelectedOptionsArray && setSelectedOptionsArray([...selectedOptions, option]) //Для связи с WrapperRectangleInput
                setSelectedOptionsCategory([])
                setIsSuccess(false)
            }
        }
    }

    const handleDeleteItem = (option: IOption) => {
        setSelectedOptions(selectedOptions.filter(item => item.id !== option.id))
        setSelectedOptionsArray && setSelectedOptionsArray(selectedOptions.filter(item => item.id !== option.id)) //Для связи с WrapperRectangleInput
    }        

    const renderSelect = (options: IOption[], placeholder: string, defaultOption: IOption | undefined, className: string, level: number) => (
        <Input.TextAndSelect
            listOptions={options}
            placeholder={placeholder}
            defaultOption={defaultOption}
            variant={variant}
            arrowSizes={arrowSizes}
            classNameMainInput={className}
            disabled={!options.length}
            onClickOption={addSelectedOption}
            key={level}
            success={isSuccess}
            setSuccess={setSuccess}
        />
    )

    return (
        <div className={cls(cl.RecursiveSelect, cl[variant], className)}>

            {renderSelect(options, "Выберите категорию", selectedOptionsCategory[0], cl.firstSelect, 0)}
            {renderSelect(selectedOptionsCategory[0]?.options ?? [], "Категория второго уровня", selectedOptionsCategory[1], cl.otherSelect, 1)}
            {renderSelect(selectedOptionsCategory[1]?.options ?? [], "Категория третьего уровня", selectedOptionsCategory[2], cl.otherSelect, 2)}
            {renderSelect(selectedOptionsCategory[2]?.options ?? [], "Категория четвертого уровня", selectedOptionsCategory[3], cl.lastSelect, 3)}

            <div className={cl.optionsContainer}>
                {selectedOptions.map(option => (
                    <OptionsAttachmentItem
                        size={EOptionsAttachmentSize.MEDIUM}
                        key={option.id}
                        title={option.name}
                        handleDelete={() => handleDeleteItem(option)}
                    />
                ))}
            </div>
        </div>
    )
}
