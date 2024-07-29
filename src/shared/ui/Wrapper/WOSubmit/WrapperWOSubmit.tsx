"use client"

import { FC, ReactNode, RefObject, useEffect } from "react"

interface WrapperWOSubmitProps{
    triggerSubmit?: (submitFn: () => void) => void,
    formRef: RefObject<HTMLFormElement>
    children?: ReactNode
}

export const WrapperWOSubmit:FC<WrapperWOSubmitProps> = ({triggerSubmit, formRef, children}) => {
    useEffect(() => {
        if (triggerSubmit) {
            triggerSubmit(() => {
                if (formRef.current && formRef.current.reportValidity()) {
                    formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                }
            });
        }
    }, [triggerSubmit])
    
    return children
}
