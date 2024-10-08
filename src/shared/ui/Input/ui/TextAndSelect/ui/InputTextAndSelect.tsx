'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import cl from './_InputTextAndSelect.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { WrapperTitleInput } from '@/shared/ui/Wrapper/Title/Input/WrapperTitleInput'
import { XMARK_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ARROW_TERTIARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { IImageSizes } from '@/shared/model/image.model'
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model'
import { EInputVariants, IInput } from '../../../model/input.model'
import Input from '../../../Input'
import { ERecursiveSelectVariant } from '../../RecursiveSelect/model/recursiveSelect.model'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { EModalView } from '@/shared/data/modal.data'
import { Modal } from '@/shared/ui/Modal/ui/Modal/Modal'
import { WrapperModalBottomDropSearch } from '@/shared/ui/Wrapper/ModalBottom/DropSearch/WrapperModalBottomDropSearch'
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart'
import { SEARCH__ICON } from '@/shared/ui/Icon/data/search.data.icon'

interface ITextAndSelectInput extends IWrapperRectangleInputChildren, IInput {
    variantRecursive?: ERecursiveSelectVariant,
    title?: string
    titleModal?: string
    options?: IOption[],
    defaultOption?: IOption,
    onClickOption?: Function,
    arrowSizes?: IImageSizes
    classNameOptions?: string,
    classNameMainInput?: string,
    disabled?: boolean,
    inputsLevel?: number,
    isActiveOptionInInput?: boolean
}

export function TextAndSelectInput({
    required,
    setSelectedOption,
    error,
    name, placeholder,
    variant = EInputVariants.ROUNDED, variantRecursive = ERecursiveSelectVariant.SINGLE,
    options=[], defaultOption,
    onClickOption, setIsListOpen,
    arrowSizes = { width: 10, height: 10 },
    title, titleModal, inputsLevel, isActiveOptionInInput,

    className, classNameOptions, classNameMainInput,
    disabled, success, setWarning, setSuccess,
}: ITextAndSelectInput) {

    //STATE
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>()
    const [isHovered, setIsHovered] = useState(false)
    const [isWarning, setIsWarning] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [is768, setIs768] = useState<boolean>(false);

    // MEMO
    const filteredOptions = useMemo(() => {
        if (!options) return [];
        return options.filter(option => option.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [options, searchQuery])

    // REF
    const inputSelectRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])

    useEffect(() => {
        if(activeOption === undefined){
            setIsSuccess(false)
        } 
        activeOption !== undefined && setSelectedOption && setSelectedOption(activeOption)
    }, [activeOption]);


    useEffect(() => {
        setWarning && setWarning(isWarning)
    }, [isWarning])

    useEffect(() => {
        if (error) {
            setWarning && setWarning(true)
            setSuccess && setSuccess(false)
            setIsSuccess(false)
            setIsWarning(true)
        }

    },[error])


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

    const toggleShowOptions = () => setShowOptions((prevShowOptions) => !prevShowOptions);


    const handleOnItem = (it: IOption) => {
        if(variant == EInputVariants.RECTANGULAR){
            setIsSuccess(true)
            setIsWarning(false)
        }
        if (onClickOption) onClickOption(it)

        if (isActiveOptionInInput || !onClickOption) setActiveOption(it)

  
        
        if (!it.options?.length) {
            setSuccess && setSuccess(true)
            if (variantRecursive === ERecursiveSelectVariant.MULTIPLE) {
                setIsSuccess(false)
            }
        }
        setShowOptions(false)
    }

    // ==={ CHANGE }===
    const checkChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (variant == EInputVariants.RECTANGULAR && !options?.some(it => it.name.toLowerCase().includes(e.target.value.trim().toLowerCase()))) {
            setIsWarning(true)
            setIsSuccess(false)
        }
        else {
            setIsWarning(false)
            setIsSuccess(true)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkChangeValue(e)
        setSearchQuery(e.target.value.toLowerCase().replaceAll('  ', ' ').trim());
        if (e.target.value === '') setIsWarning(true)
    }

    return (
        <>
            <HandleSize width={768} set={setIs768} />
            <WrapperClickOutside _ref={inputSelectRef} 
                isShow={showOptions} 
                handle={toggleShowOptions} 
                className={cls(
                    cl.block, 
                    variant === EInputVariants.ROUNDED && showOptions ? cl.show : variant === EInputVariants.RECTANGULAR && showOptions ? cl.showOptionsRectangular : '', 
                    className
                )}>
                <WrapperTitleInput title={title}>
                    <div onClick={!disabled ? toggleShowOptions : () => { }} className={cl.visible}>
                        <div className={cls(cl.mainInput,
                            cl[variant],
                            showOptions && variant === EInputVariants.RECTANGULAR ? cl.rectangularListOpen : '',
                            isWarning && variant === EInputVariants.RECTANGULAR ? cl.error  : isSuccess && variant === EInputVariants.RECTANGULAR ? cl.success : '',
                            disabled ? cl.disabled : '',
                            classNameMainInput)}>
                            {showOptions ? (
                                variant === EInputVariants.ROUNDED ? (
                                    <input type="text"
                                        value={searchQuery}
                                        onClick={e => e.stopPropagation()}
                                        onChange={handleInputChange}
                                        autoFocus
                                        className={cl.input}
                                        required={required}
                                        /> 
                                ) : (
                                    <div className={cl.inputContainer}>
                                        <ImageSmart icon={SEARCH__ICON} alt={"Поиск"} width={19} height={19} className={cl.imageSearch} />
                                        <input type="text"
                                                value={searchQuery}
                                                onClick={e => e.stopPropagation()}
                                                onChange={handleInputChange}
                                                autoFocus 
                                                className={cl.input}/>
                                    </div>
                                )
                            ) : (
                                <p className={cls(
                                    cl.selectedOption,
                                    !activeOption && placeholder ? cl.placeholder : '',
                                    disabled ? cl.disabledPlaceholder : ''
                                    )}>
                                    {!activeOption && placeholder ? placeholder : activeOption?.name}
                                </p>
                            )}
                            <Button variant={ButtonVariant.DEFAULT} 
                                    beforeImage={ARROW_TERTIARY_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height}} 
                                    disabled={disabled} 
                                    className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')} />

                        </div>
                    </div>
                </WrapperTitleInput>

                {!is768 ? (
                    <>
                        {filteredOptions.length  ? (
                            <Input.List.Radio
                                variant={variant}
                                options={filteredOptions}
                                defaultOption={activeOption}
                                name={name}
                                onClickOption={handleOnItem}
                                className={cls(cl.options, classNameOptions, showOptions ? cl.show : '')} />
                        ) : (
                            <>
                                {showOptions && variant === EInputVariants.ROUNDED && 
                                    <p className={cl.noResult}>
                                        К сожалению, такого варианта нет (X_X)
                                    </p>
                                }
                                {showOptions && variant === EInputVariants.RECTANGULAR && 
                                    <div className={cl.noResultRect}>
                                        <span>Ничего не найдено</span>
                                        <Button variant={ButtonVariant.DEFAULT}
                                                onMouseEnter={handleOnMouseEnter}
                                                onMouseLeave={handleOnMouseLeave}
                                                onClick={resetInputValue}
                                                beforeImage={XMARK_ICON} beforeProps={{ width: 14, height: 14 }}
                                                className={cl.xmarkButton} />
                                    </div>
                                }
                            </>
                        )}
                    </>
                ) : (
                    <Modal view={EModalView.BOTTOM}
                        buttonNode
                        isOpen={showOptions}
                        onClickOverlay={toggleShowOptions}
                        classNameSidebar={cl.modal}> 
                        <WrapperModalBottomDropSearch 
                            title={titleModal}
                            searchQuery={searchQuery} 
                            handleInputChange={handleInputChange}
                            options={filteredOptions}
                            setIsOpen={toggleShowOptions}
                            onClickOption={handleOnItem}
                            classNameBottomChild={cl.modalBottomChild} />
                    </Modal>
                )}
            </WrapperClickOutside>
        </>
    )
}

