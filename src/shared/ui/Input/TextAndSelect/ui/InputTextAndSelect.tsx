'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import cl from './_InputTextAndSelect.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import InputList from '../../List/InputList'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { EInputSizes, EInputVariants } from '../../model/input.model'

interface ITextAndSelectInput {
    variant?: EInputVariants,
    size?: EInputSizes,
    title?: string
    listOptions?: IOption[],
    defaultOption: IOption,
    onClickOption?: Function,
    name?: string,
    imageWidth?: number,
    imageHeight?: number
    className?: string,
    classNameOptions?: string,
    setIsListOpen?: Function
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
    setIsListOpen
}: ITextAndSelectInput) {

    //STATE
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [warning, setWarning] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);


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
    const toggleShowOptions = useCallback(() => {
        setShowOptions((prevShowOptions) => !prevShowOptions);
    }, []);

    const handleOnItem = useCallback((it: IOption) => {
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }, [setActiveOption, onClickOption, setShowOptions])

    // ==={ CHANGE }===
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value.toLowerCase().replaceAll('  ', ' ').trim());
        }, []);


    return (
        <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions} className={cls(cl.block, showOptions ? cl.show : '', className)}>
            <WrapperTitleInput title={title}>
                <div onClick={toggleShowOptions}
                    className={cl.visible}>
                    <div className={cls(cl.mainInput, cl[variant], cl[size], showOptions ? cl.rectangularListOpen : '')}>
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
                            <p className={cl.selectedOption}>
                                {activeOption?.name}
                            </p>}
                        <div className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')}>
                            <Image className={showOptions ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={imageWidth} height={imageHeight} />
                        </div>

                    </div>
                </div>
            </WrapperTitleInput>

            {filteredOptions.length ? (
                <InputList.Radio
                    size={size}
                    variant={variant}
                    options={filteredOptions}
                    className={cls(cl.options, classNameOptions, showOptions ? cl.show : '')}
                    defaultOption={activeOption}
                    name={name}
                    onClickOption={handleOnItem}
                />
            ) : (
                <p className={cl.noResult}>К сожалению, такой страны нет (X_X)</p>
            )}
        </WrapperClickOutside>
    )
}

