'use client'

import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'
import { useEffect, useRef, useState } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ARROW_TERTIARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { IImageSizes } from '@/shared/model/image.model'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'
import Input from '../../../Input'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { EInputSizes, EInputVariants, IInput } from '../../../model/input.model'

interface InputSelectProps extends IWrapperRectangleInputChildren, IInput{
    options: IOption[]
    defaultOption?: IOption
    onClickOption?: Function,
    arrowSizes?: IImageSizes
    title?: string
    classNameTitle?: string
    classNameOptions?: string,
    classNameButton?: string
}

export function InputSelect({
    variant = EInputVariants.ROUNDED,
    size = EInputSizes.NONE,
    defaultOption,
    options,
    name,
    onClickOption,
    arrowSizes = {
        width: 10,
        height: 10
    },
    title,
    className,
    classNameTitle,
    classNameOptions,
    classNameButton,
    placeholder,
    success,
    setSuccess,
    warning,
    setWarning,
}: InputSelectProps) {

    // STATE
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // REF
    const inputSelectRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])

    const checkValue = () => {
        const isSelected = activeOption && options.some(it => it.id === activeOption.id)
        if (isSelected) {
            setWarning && setWarning(false)
            setSuccess && setSuccess(true)
        } else {
            setWarning && setWarning(true)
            setSuccess && setSuccess(false)
        }
    }


    // ==={ CLICK }===
    const toggleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleOnTitle = () => {
        setShowOptions(prevState => !prevState)
    }

    const handleOnItem = (it: IOption) => {
        checkValue()
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }

    return (
        <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions} className={cls(cl.block, variant === EInputVariants.ROUNDED && showOptions ? cl.show : variant === EInputVariants.RECTANGULAR && showOptions ? cl.showOptionsRectangular : '', className)}>
            <WrapperTitleInput title={title}>
                <div onClick={handleOnTitle} className={cls(cl.button, cl[variant], cl[size], variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton, warning ? cl.error : success ? cl.success : '')}>
                    <span className={cls(cl.title, classNameTitle, !activeOption && placeholder ? cl.placeholder : '')}>
                        {!activeOption && placeholder ? placeholder : activeOption?.name}
                    </span>
                    <Button variant={ButtonVariant.DEFAULT} className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '', showOptions ? cl.arrowOpen : '')} beforeImage={ARROW_TERTIARY_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />
                </div>
                {/* <Button variant={ButtonVariant.DEFAULT} 
                onClick={handleOnTitle} className={cls(cl.button, cl[variant], cl[size], variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton, warning ? cl.error : success ? cl.success : '')}
                    classNameText={cls(cl.title, classNameTitle, !activeOption && placeholder ? cl.placeholder : '')}
                    title={!activeOption && placeholder ? placeholder : activeOption?.name}>
                    <Button variant={ButtonVariant.DEFAULT} className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '', showOptions ? cl.arrowOpen : cl.arrow)} beforeImage={ARROW_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />
                </Button> */}

            </WrapperTitleInput>
            <Input.List.Radio
                size={size}
                variant={variant}
                options={options}
                defaultOption={activeOption}
                name={name}
                onClickOption={handleOnItem}
                className={cls(cl.options, classNameOptions, showOptions ? cl.show : '')} />
        </WrapperClickOutside>
    )
}