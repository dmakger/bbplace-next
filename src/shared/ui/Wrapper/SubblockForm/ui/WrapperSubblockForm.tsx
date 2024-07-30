import { FC, ReactNode, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSubblockForm.module.scss'
import { SubblockFormVariant } from "../data/subblockForm.data";
import { HeaderSubblockForm } from "../components/Header/HeaderSubblockForm";

interface WrapperSubblockFormProps {
    title: string
    variant?: SubblockFormVariant
    isOpen?: boolean
    children?: ReactNode
    className?: string,
}

export const WrapperSubblockForm:FC<WrapperSubblockFormProps> = ({
    title, 
    variant=SubblockFormVariant.Static, isOpen: isOurOpen=true, 
    children, className
}) => {
    // STATE
    const [isOpen, setIsOpen] = useState(isOurOpen)

    // HANDLE
    const handleOnClickHeader = () => {
        setIsOpen(prevState => !prevState)
    }

    return (
        <div className={cls(cl.block, className)}>
            <HeaderSubblockForm title={title} variant={variant} isOpen={isOpen} onClickHeader={handleOnClickHeader} />
            <div className={cl.content}>
                {variant !== SubblockFormVariant.Toggle || (variant === SubblockFormVariant.Toggle && isOpen) && (
                    <> {children} </>
                )}
            </div>
        </div>
    )
}
