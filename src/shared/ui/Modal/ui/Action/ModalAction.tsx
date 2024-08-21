"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ModalAction.module.scss'
import { Modal } from "../Modal/Modal";
import { Button } from "@/shared/ui/Button";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import { IModal, IModalActionInput } from "../../model/modal.model";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { IButton } from "@/shared/ui/Button/ui/Button";
import Image from "next/image";
import BBPlaceGrayLeftAndRightBackgroundICON from "@/shared/assets/img/Background/BBPlace/BBPlaceGrayLeftAndRight.svg"
 
export interface IModalActionProps extends IModal{
    title: string
    text?: string[]
    inputProps?: IModalActionInput
    buttonFirst?: IButton
    buttonSecond?: IButton
    hasBackground?: boolean
    className?: string,
}


export const ModalAction:FC<IModalActionProps> = ({
    title, 
    text, 
    inputProps,
    buttonFirst, buttonSecond, 
    hasBackground=false,
    className,
    ...modalProps
}) => {
    // STATE
    const [inputValue, setInputValue] = useState(inputProps?.defaultValue)

    // HANDLE
    const handleOnClickAddition = () => {
        if (inputProps && inputValue)
            inputProps.setText(inputValue)
    }

    return (
        <Modal {...modalProps}
            className={cls(className)} classNameSidebar={cl.modalSidebar}>
            <div className={cls(cl.wrapper, hasBackground ? cl.showBackgroundImage : '')}>
                {hasBackground && (
                    <Image src={BBPlaceGrayLeftAndRightBackgroundICON} alt={"qwe"} className={cl.backgroundImage} />
                )}
                <div className={cl.body}>
                    <h2 className={cl.title}>{title}</h2>
                    {/* ====={ TEXT }===== */}
                    {text && (
                        <div className={cl.text}>
                            {text.map((textItem, index) => (
                                <p className={cl.textItem} key={index}>{textItem}</p>
                            ))}
                        </div>
                    )}
                    {/* ====={ INPUT }===== */}
                    {inputProps && (
                        <WrapperRectangleInput labelText={inputProps.labelText} className={cl.wrapperInput}>
                            <Input.Addition onClickAdd={handleOnClickAddition}>
                                <Input.Text variant={EInputVariants.RECTANGULAR} type={inputProps.type}
                                            placeholder={inputProps.placeholder} 
                                            value={inputValue} setValue={setInputValue}/>
                            </Input.Addition>
                        </WrapperRectangleInput>
                    )}
                    {/* ====={ BUTTONS }===== */}
                    {(buttonFirst || buttonSecond) && (
                        <div className={cl.buttons}>
                            {buttonSecond && (
                                <Button {...buttonSecond} />
                            )}
                            {buttonFirst && (
                                <Button {...buttonFirst} />
                            )}
                        </div>
                    )}
                </div>
            </div>    
        </Modal>
    )
}
