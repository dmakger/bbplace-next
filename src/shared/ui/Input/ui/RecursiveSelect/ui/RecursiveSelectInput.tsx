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
import { ERecursiveSelectVariant, IResursiveSelectInputsArray } from "../model/recursiveSelect.model"

interface IRecursiveSelectInput extends IWrapperRectangleInputChildren {
    className?: string,
    variant?: EInputVariants,
    variantRecursive?: ERecursiveSelectVariant,
    arrowSizes?: IImageSizes,
    inputLevels: number,
    inputsProps: IResursiveSelectInputsArray[],
    selectedoptionsCommonArray: IOption[],
    setselectedoptionsCommonArray: Function,
    selectedoptions: IOption[],
    setselectedoptions: Function
}

export const RecursiveSelectInput = ({
    variant = EInputVariants.RECTANGULAR,
    variantRecursive = ERecursiveSelectVariant.SINGLE,
    className,
    arrowSizes = {
        width: 10,
        height: 10
    },
    selectedoptionsCommonArray,
    setselectedoptionsCommonArray,
    selectedoptions,
    setselectedoptions,
    inputsProps,
    setWarning,
    success,
    setselectedoptionsarray,
    setSuccess

}: IRecursiveSelectInput) => {

    //STATE
    const [deletingOption, setDeletingOption] = useState<number>()

    //FUNCTION
    const addselectedoption = (option: IOption, level: number) => {
        const newselectedoptionsCategory = [...selectedoptionsCommonArray]

        newselectedoptionsCategory[level] = option

        newselectedoptionsCategory.length = level + 1

        setselectedoptionsCommonArray(newselectedoptionsCategory)


        if (!option.options?.length && !selectedoptions.find(it => it.id === option.id)) {
            if (variantRecursive == ERecursiveSelectVariant.SINGLE) return setselectedoptions([option]);

            setselectedoptions([...selectedoptions, option])
            setselectedoptionsarray && setselectedoptionsarray([...selectedoptions, option]) //Для связи с WrapperRectangleInput
            setselectedoptionsCommonArray([])
        }
    }

    const handleDeleteItem = (option: IOption) => {
        setDeletingOption(option.id)
        setTimeout(() => { // Для плавной анимации добавления и удаления OptionsAttachmentItem
            const updatedselectedoptions = selectedoptions.filter(item => item.id !== option.id);

            setselectedoptions(updatedselectedoptions)
            if(variantRecursive === ERecursiveSelectVariant.SINGLE){
                setselectedoptionsCommonArray([])
                setSuccess && setSuccess(false)
            }
            setselectedoptionsarray && setselectedoptionsarray(updatedselectedoptions) //Для связи с WrapperRectangleInput
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
            onClickOption={(option: IOption) => addselectedoption(option, level)}
            key={level}
            success={success}
            setSuccess={setSuccess}
            setWarning={setWarning}
        />
    )

    return (
        <div className={cls(cl.RecursiveSelect, cl[variant], className)}>
            {(variantRecursive === ERecursiveSelectVariant.SINGLE ? !selectedoptions.length : true) && inputsProps.map((inputProps, index) => (
                renderSelect(
                    inputProps.currentOptions,
                    inputProps.placeholder,
                    selectedoptionsCommonArray[index],
                    index,
                    inputProps.className
                )
            ))}

            {selectedoptions.length > 0 && <div className={cl.optionsContainer}>
                {selectedoptions.map(option => (
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
