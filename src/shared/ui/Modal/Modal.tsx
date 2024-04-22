'use client'

import { FC, ReactNode, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Modal.module.scss'
import { EModalView } from "@/shared/data/modal.data";

interface ModalProps{
    _isOpen?: boolean
    onClickOverlay?: Function
    view?: EModalView
    hasBlack?: boolean
    buttonNode: ReactNode
    children: ReactNode
    className?: string,
}

export const Modal:FC<ModalProps> = ({_isOpen=false, onClickOverlay=()=>{}, view=EModalView.CENTER, hasBlack=true, buttonNode, children, className}) => {
    // REF
    const modalRef = useRef<HTMLDivElement>(null);
    
    // STATE
    const [isOpen, setIsOpen] = useState(false);
    console.log('msi', isOpen);
    
    // EFFECT
    useEffect(() => {
        if (isOpen === _isOpen)
            return
        setIsOpen(_isOpen)
    }, [_isOpen])

    const views = {
        [EModalView.CENTER]: cl.center,
        [EModalView.LEFT]: cl.left,
        [EModalView.RIGHT]: cl.right,
    }

    return (
        <>
            {buttonNode}
            <div className={cls(isOpen ? cl.open : '', cl.modal, className)}>
                <div onClick={()=>onClickOverlay()} className={cls(isOpen ? cl.openOverlay : '', cl.overlay, hasBlack ? cl.black : '', className)} />
                <div className={cls(isOpen ? cl.openSidebar : '', views[view], cl.sidebar)}>
                    {children}
                </div>
            </div>
            {/* <div ref={modalRef} onClick={() => onClickOverlay()} className={cls(cl.modal, isOpen ? cl.openOverlay : '', className)}>
                <div onClick={e => e.stopPropagation()} className={cls(cl.content, className)}>
                    {children}
                </div>
            </div> */}
        </>
    )
}
