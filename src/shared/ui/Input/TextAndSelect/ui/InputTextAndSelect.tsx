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
import XMARK from '@/shared/assets/img/xmark.svg'

interface ITextAndSelectInput {
    variant?: EInputVariants,
    size?: EInputSizes,
    title?: string
    listOptions?: IOption[],
    defaultOption?: IOption,
    onClickOption?: Function,
    name?: string,
    imageWidth?: number,
    imageHeight?: number
    className?: string,
    classNameOptions?: string,
    setIsListOpen?: Function
    placeholder?: string,
    success?: boolean
    setSuccess?: Function
    warning?: boolean,
    setWarning?: Function
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
    imageWidth = 10,
    imageHeight = 10,
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


    // ==={ CLICK }===
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
        else{
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
                        {showOptions ? <input
                            type="text"
                            className={cl.input}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            onChange={handleInputChange}
                            value={searchQuery}
                            autoFocus
                        />
                            :
                            <p className={cls(cl.selectedOption, !activeOption && placeholder ? cl.placeholder : '')}>
                                {!activeOption && placeholder ? placeholder : activeOption?.name}
                            </p>}
                        <div className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')}>
                            <Image className={showOptions ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={imageWidth} height={imageHeight} />
                        </div>

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
                        <Image src={XMARK} alt='xmark' width={14} height={14} />
                    </div>}</>

            )}
        </WrapperClickOutside>
    )
}

