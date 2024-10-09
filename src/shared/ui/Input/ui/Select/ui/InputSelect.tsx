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
import { EInputVariants, IInput } from '../../../model/input.model'
import { Modal } from '@/shared/ui/Modal/ui/Modal/Modal'
import { EModalView } from '@/shared/data/modal.data'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { WrapperModalBottomDropList } from '@/shared/ui/Wrapper/ModalBottom/DropList/WrapperModalBottomDropList'

interface InputSelectProps extends IWrapperRectangleInputChildren, IInput {
    options: IOption[]
    defaultOption?: IOption
    onClickOption?: Function,
    arrowSizes?: IImageSizes,
    disabled?: boolean,
    title?: string
    titleModal?: string
    classNameTitle?: string
    classNameOptions?: string,
    classNameButton?: string
}

export function InputSelect({
    name, placeholder,
    variant = EInputVariants.ROUNDED,
    defaultOption, options,
    onClickOption,
    arrowSizes = { width: 10, height: 15 },
    disabled,
    required,
    title, titleModal,

    error,

    className, classNameTitle, classNameOptions, classNameButton,
    success, setSuccess, warning, setWarning, 
}: InputSelectProps) {

    // STATE
    const [showOptions, setShowOptions] = useState(false)
    const [activeOption, setActiveOption] = useState<IOption | undefined>(defaultOption)
    // const [isWarning, setIsWarning] = useState<boolean>(false);
    // const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [is768, setIs768] = useState<boolean>(false);

    // REF
    const inputSelectRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false)

    // EFFECT
    useEffect(() => {
        setActiveOption(defaultOption)
    }, [defaultOption])

    useEffect(() => {
        if (disabled) {
            setWarning?.(false)
            setSuccess?.(true)            
        }
    }, [disabled])

    useEffect(() => {
        if (error) {
            setWarning && setWarning(true)
            setSuccess && setSuccess(false)
        }
    },[error])

    useEffect(() => {
        if (isMounted.current && activeOption && !disabled) {
            checkValue()
        } else {
            isMounted.current = true
        }
    }, [activeOption])    


    //FUNCTIONS
    const checkValue = () => {
        const isSelected = options.some(it => it.id === activeOption?.id)        
        setWarning?.(!isSelected && error || warning)
        setSuccess?.(isSelected)
    }


    // ==={ CLICK }===
    const toggleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleOnTitle = () => {
        setShowOptions(prevState => !prevState)
    }

    const handleOnItem = (it: IOption) => {
        setActiveOption(it)
        setWarning?.(false)
        setSuccess?.(true)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
    }

    //VARIABLE
    const noActiveOption = !activeOption || !Object.keys(activeOption).length;

    return (
        <>
            <HandleSize width={768} set={setIs768} />
            <WrapperClickOutside _ref={inputSelectRef} isShow={showOptions} handle={toggleShowOptions}
                className={cls(
                    cl.block,
                    variant === EInputVariants.ROUNDED && showOptions ? cl.show : variant === EInputVariants.RECTANGULAR && showOptions ? cl.showOptionsRectangular : '',
                    className
                )}>
                <WrapperTitleInput title={title}>
                    <div onClick={!disabled ? handleOnTitle : () => { }} className={cls(cl.button, cl[variant], variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton, warning ? cl.error : success ? cl.success : '', disabled ? cl.disabled : '',)}>
                        <span className={cls(cl.title, classNameTitle, noActiveOption && placeholder ? cl.placeholder : '')}>
                            {noActiveOption && placeholder ? placeholder : activeOption?.name}
                        </span>
                        <Button variant={ButtonVariant.DEFAULT}
                            className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')}
                            beforeImage={ARROW_TERTIARY_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} disabled={disabled} />
                    </div>
                    {/* <Button variant={ButtonVariant.DEFAULT} 
                    onClick={handleOnTitle} className={cls(cl.button, cl[variant], cl[size], variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton, warning ? cl.error : success ? cl.success : '')}
                        classNameText={cls(cl.title, classNameTitle, !activeOption && placeholder ? cl.placeholder : '')}
                        title={!activeOption && placeholder ? placeholder : activeOption?.name}>
                        <Button variant={ButtonVariant.DEFAULT} className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '', showOptions ? cl.arrowOpen : cl.arrow)} beforeImage={ARROW_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />
                    </Button> */}

                </WrapperTitleInput>
                {!is768 ? (
                    <Input.List.Radio
                        variant={variant}
                        options={options}
                        defaultOption={activeOption}
                        required={required}
                        name={name}
                        onClickOption={handleOnItem}
                        className={cls(cl.options, classNameOptions, showOptions ? cl.show : '')} />
                ) : (
                    <Modal view={EModalView.BOTTOM}
                        buttonNode
                        isOpen={showOptions}
                        onClickOverlay={toggleShowOptions}>
                        <WrapperModalBottomDropList
                            title={titleModal}
                            options={options}
                            setIsOpen={toggleShowOptions}
                            onClickOption={handleOnItem}
                            classNameBottomChild={cl.modalBottomChild} />
                    </Modal>
                )}
            </WrapperClickOutside>
        </>
    )
}