'use client'

import { FC, ReactNode, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Modal.module.scss'
import { EModalView } from "@/shared/data/modal.data";
import { Button, ButtonVariant } from "../../../Button";
import { IModal } from "../../model/modal.model";
import { XMARK_WHITE__ICON } from "@/shared/ui/Icon/data/xmark.data.icon";

interface ModalProps extends IModal{
    children: ReactNode
    className?: string,
    classNameSidebar?: string
}

export const Modal:FC<ModalProps> = ({
    isOpen: isOwnOpen=false, 
    onClickOverlay=()=>{}, 
    view=EModalView.CENTER, 
    hasBlack=true, 
    hasClose=false, propsButtonClose, 
    buttonNode, children, 
    className, classNameSidebar
}) => {    
    // STATE
    const [isOpen, setIsOpen] = useState(false);

    // EFFECT
    useEffect(() => {
        if (isOpen === isOwnOpen) return
        setIsOpen(isOwnOpen)
    }, [isOwnOpen])

    useEffect(() => {
        document.body.style.overflow = isOwnOpen ? 'hidden' : 'visible'
    }, [isOwnOpen])

    // VIEWS
    const views = {
        [EModalView.CENTER]: cl.center,
        [EModalView.LEFT]: cl.left,
        [EModalView.RIGHT]: cl.right,
        [EModalView.BOTTOM]: cl.bottom,
    }

    return (
        <>
            {buttonNode}
            <div className={cls(isOpen ? cl.open : '', cl.modal, className)} autoFocus>
                <div onClick={()=>onClickOverlay()} className={cls(isOpen ? cl.openOverlay : '', cl.overlay, hasBlack ? cl.black : '', className)} />
                <div className={cls(isOpen ? cl.openSidebar : '', views[view], cl.sidebar, classNameSidebar)}>
                    {hasClose && 
                        <Button {...propsButtonClose} 
                                variant={propsButtonClose?.variant ?? ButtonVariant.DEFAULT}
                                onClick={propsButtonClose?.onClick ?? onClickOverlay} 
                                afterImage={propsButtonClose?.afterImage ?? XMARK_WHITE__ICON}
                                className={cls(cl.close, propsButtonClose?.className)} />
                    }
                    {children}
                </div>
            </div>
        </>
    )
}
