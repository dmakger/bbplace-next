'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import cl from './_InputTextAndSelect.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { XMARK_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ARROW_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { IImageSizes } from '@/shared/model/image.model'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'
import { EInputVariants, IInput } from '../../../model/input.model'
import Input from '../../../Input'
import SEARCH_ICON from '@/../public/searchGray.svg'

interface ITextAndSelectInput extends IWrapperRectangleInputChildren, IInput {
    title?: string
    listOptions?: IOption[],
    defaultOption?: IOption,
    onClickOption?: Function,
    arrowSizes?: IImageSizes
    classNameOptions?: string,
    classNameMainInput?: string,
    disabled?: boolean
}

export function TextAndSelectInput({
    variant = EInputVariants.ROUNDED,
    title,
    className,
    classNameOptions,
    classNameMainInput,
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
    warning,
    setWarning,
    disabled,
    success,
    setSuccess
}: ITextAndSelectInput) {

    //STATE
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [isHovered, setIsHovered] = useState(false)
    const [isWarning, setIsWarning] = useState<boolean>(warning ?? false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

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
        setIsSuccess(success ?? false);
    }, [success]);

    useEffect(() => {
        setSuccess && setSuccess(isSuccess);
    }, [isSuccess]);


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
            setIsSuccess(true)
        }
    }

    const toggleShowOptions = useCallback(() => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    }, []);


    const handleOnItem = useCallback((it: IOption) => {
        checkClickValue()
        setIsSuccess(true)

        if (onClickOption) onClickOption(it) 
        else setActiveOption(it)

        if(!it.options?.length) setIsSuccess(false)

        setShowOptions(false)
    }, [setActiveOption, onClickOption, setShowOptions])

    // ==={ CHANGE }===
    const checkChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!listOptions?.some(it => it.name.toLowerCase().includes(e.target.value.trim().toLowerCase()))) {
            setWarning && setWarning(true)
            setIsSuccess(false)
        }
        else {
            setWarning && setWarning(false)
            setIsSuccess(true)
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
                <div onClick={!disabled ? toggleShowOptions : () => { }}
                    className={cl.visible}>
                    <div className={cls(cl.mainInput,
                        cl[variant],
                        showOptions && variant === EInputVariants.RECTANGULAR ? cl.rectangularListOpen : '',
                        warning ? cl.error : isSuccess ? cl.success : '',
                        disabled ? cl.disabled : '',
                        classNameMainInput)}>
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
                                <Image src={SEARCH_ICON} alt={"Поиск"} width={19} height={19} className={cl.imageSearch} />
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
                            <p className={cls(cl.selectedOption,
                             !activeOption && placeholder ? cl.placeholder : '',
                             disabled ? cl.disabledPlaceholder : '')}>
                                {!activeOption && placeholder ? placeholder : activeOption?.name}
                            </p>}
                        <Button variant={ButtonVariant.DEFAULT} className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '', showOptions ? cl.arrowOpen : cl.arrow)} beforeImage={ARROW_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />

                    </div>
                </div>
            </WrapperTitleInput>

            {filteredOptions.length ? (
                <Input.List.Radio
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
                    {showOptions && variant === EInputVariants.RECTANGULAR && <div className={cl.noResultRect}>
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

