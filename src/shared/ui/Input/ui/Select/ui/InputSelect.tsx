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
import { Modal } from '@/shared/ui/Modal/Modal'
import { EModalView } from '@/shared/data/modal.data'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { WrapperModalBottomDropList } from '@/shared/ui/Wrapper/ModalBottom/DropList/WrapperModalBottomDropSearch'
// import { Button } from '@/shared/ui/Button/ui/Button'
// import { ButtonVariant } from '@/shared/ui/Button'

interface InputSelectProps extends IWrapperRectangleInputChildren, IInput{
    options: IOption[]
    defaultOption?: IOption
    onClickOption?: Function,
    arrowSizes?: IImageSizes
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
    title, titleModal,
    
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


    const checkValue = () => {
        if (isMounted.current) {
            const isSelected = activeOption && options.some(it => it.id === activeOption.id)
            if (isSelected) {
                setWarning && setWarning(false)
                setSuccess && setSuccess(true)
            } else {
                setWarning && setWarning(true)
                setSuccess && setSuccess(false)
            }
        } else {
            isMounted.current = true
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
        setActiveOption(it)
        if (onClickOption) onClickOption(it)
        setShowOptions(false)
        checkValue()
    }

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
                    <div onClick={handleOnTitle} className={cls(cl.button, cl[variant],  variant === EInputVariants.RECTANGULAR && showOptions ? cl.activeButton : '', classNameButton, warning ? cl.error : success ? cl.success : '')}>
                        <span className={cls(cl.title, classNameTitle, !activeOption && placeholder ? cl.placeholder : '')}>
                            {!activeOption && placeholder ? placeholder : activeOption?.name}
                        </span>
                        <Button variant={ButtonVariant.DEFAULT} 
                                className={cls(cl.arrowContainer, showOptions ? cl.activeArrow : '')} 
                                beforeImage={ARROW_TERTIARY_WO_ICON} beforeProps={{ width: arrowSizes.width, height: arrowSizes.height }} />
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
                        name={name}
                        onClickOption={handleOnItem}
                        className={cls(cl.options, classNameOptions, showOptions && is768 ? cl.show : '')} />
                ) : (
                    <Modal view={EModalView.BOTTOM}
                        buttonNode
                        _isOpen={showOptions}
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