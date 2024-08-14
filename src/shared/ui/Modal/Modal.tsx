'use client'

import { FC, ReactNode, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Modal.module.scss'
import { EModalView } from "@/shared/data/modal.data";
import { Button } from "../Button";

interface ModalProps{
    _isOpen?: boolean
    onClickOverlay?: Function
    view?: EModalView
    hasBlack?: boolean
    hasClose?: boolean
    buttonNode: ReactNode
    children: ReactNode
    className?: string,
    classNameSidebar?: string
}

export const Modal:FC<ModalProps> = ({_isOpen=false, onClickOverlay=()=>{}, view=EModalView.CENTER, hasBlack=true, hasClose=false, buttonNode, children, className, classNameSidebar}) => {    
    // STATE
    const [isOpen, setIsOpen] = useState(false);

    // EFFECT
    useEffect(() => {
        if (isOpen === _isOpen) return
        setIsOpen(_isOpen)
    }, [_isOpen])

    useEffect(() => {
        if(_isOpen)
            document.body.style.overflow = 'hidden'
        else{
            document.body.style.overflow = 'visible'
        }
    }, [_isOpen])

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
            <div className={cls(isOpen ? cl.open : '', cl.modal, className)}>
                <div onClick={()=>onClickOverlay()} className={cls(isOpen ? cl.openOverlay : '', cl.overlay, hasBlack ? cl.black : '', className)} />
                <div className={cls(isOpen ? cl.openSidebar : '', views[view], cl.sidebar, classNameSidebar)}>
                    {hasClose && 
                        <Button title="Close" onClick={onClickOverlay} className={cl.close} />
                    }
                    {children}
                </div>
            </div>
        </>
    )
}
