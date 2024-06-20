'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import cl from './_InputTextAndSelect.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { EInputSizes, EInputVariants } from '../../model/input.model'
import Input from '../../Input'
import { XMARK_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ARROW_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { IImageSizes } from '@/shared/model/image.model'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'

interface ITextAndSelectInput extends IWrapperRectangleInputChildren{
    variant?: EInputVariants,
    size?: EInputSizes,
    title?: string
    listOptions?: IOption[],
    defaultOption?: IOption,
    onClickOption?: Function,
    name?: string,
    arrowSizes?: IImageSizes
    className?: string,
    classNameOptions?: string,
    placeholder?: string,
}

export function TextAndSelectInput({
    variant = EInputVariants.ROUNDED,
    size = EInputSizes.NONE,
    title,
    className,
    classNameOptions,
    listOptions,
    defaultOption,
    onClickOption,
    name,
    arrowSizes = {
        width: 10,
        height: 10
    },
    setIsListOpen,
    placeholder,
    success,
    setSuccess,
    warning,
    setWarning
}: ITextAndSelectInput) {

    //STATE
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [isHovered, setIsHovered] = useState(false)
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success ?? false);

    //MEMO
    const filteredOptions = useMemo(() => {
        if (!listOptions) return [];
        return listOptions.filter(option => option.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [listOptions, searchQuery])

    //REF
    const inputSelectRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])

    useEffect(() => {
        setSearchQuery('')
        setIsListOpen && setIsListOpen(showOptions)
    }, [showOptions])

    // HANDLE
    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
    }

    // ==={ CLICK }===

    const resetInputValue = () => {
        setSearchQuery('')
        setIsHovered(false)
    };

    const checkClickValue = () => {
        if (activeOption && activeOption?.name !== '') {
            setWarning && setWarning(false)
            setSuccess && setSuccess(true)
        }
    }

    const toggleShowOptions = useCallback(() => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    }, []);


    const handleOnItem = useCallback((it: IOption) => {
        checkClickValue()
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }, [setActiveOption, onClickOption, setShowOptions])

    // ==={ CHANGE }===
    const checkChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!listOptions?.some(it => it.name.toLowerCase().includes(e.target.value.trim().toLowerCase()))) {
            setWarning && setWarning(true)
            setSuccess && setSuccess(false)
        }
        else {
            setWarning && setWarning(false)
            setSuccess && setSuccess(true)
        }
    }

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            checkChangeValue(e)
            setSearchQuery(e.target.value.toLowerCase().replaceAll('  ', ' ').trim());
        }, []);

    return (
        <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions} className={cls(cl.block, variant === EInputVariants.ROUNDED && showOptions ? cl.show : variant === EInputVariants.RECTANGULAR && showOptions ? cl.showOptionsRectangular : '', className)}>
            <WrapperTitleInput title={title}>
                <div onClick={toggleShowOptions}
                    className={cl.visible}>
                    <div className={cls(cl.mainInput, cl[variant], cl[size], showOptions && variant === EInputVariants.RECTANGULAR ? cl.rectangularListOpen : '', warning ? cl.error : success ? cl.success : '')}>
                        {showOptions ? (variant === EInputVariants.ROUNDED ?
                            <input
                                type="text"
                                className={cl.input}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                onChange={handleInputChange}
                                value={searchQuery}
                                autoFocus
                            /> :
                            <div className={cl.inputContainer}>
                                <Image src={"searchGray.svg"} alt={"Поиск"} width={19} height={19} className={cl.imageSearch} />
                                <input
                                    type="text"
                                    className={cl.input}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onChange={handleInputChange}
                                    value={searchQuery}
                                    autoFocus
                                />

                            </div>)
                            :
                            <p className={cls(cl.selectedOption, !activeOption && placeholder ? cl.placeholder : '')}>
                                {!activeOption && placeholder ? placeholder : activeOption?.name}
                            </p>}
                        <Button variant={ButtonVariant.DEFAULT} className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '',showOptions ? cl.arrowOpen : cl.arrow)} beforeImage={ARROW_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />

                    </div>
                </div>
            </WrapperTitleInput>

            {filteredOptions.length ? (
                <Input.List.Radio
                    size={size}
                    variant={variant}
                    options={filteredOptions}
                    className={cls(cl.options, classNameOptions, showOptions ? cl.show : '')}
                    defaultOption={activeOption}
                    name={name}
                    onClickOption={handleOnItem}
                />
            ) : (
                <>
                    {variant === EInputVariants.ROUNDED && <p className={cl.noResult}>
                        К сожалению, такой страны нет (X_X)
                    </p>}
                    {variant === EInputVariants.RECTANGULAR && <div className={cl.noResultRect}>
                        <span>Ничего не найдено</span>
                        <Button variant={ButtonVariant.DEFAULT}
                            className={cl.xmarkButton}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={resetInputValue}
                            beforeImage={XMARK_ICON}
                            beforeProps={{ width: 14, height: 14 }}
                        />
                    </div>}
                </>

            )}
        </WrapperClickOutside>
    )
}

