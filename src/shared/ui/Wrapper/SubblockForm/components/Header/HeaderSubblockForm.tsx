import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeaderSubblockForm.module.scss'
import { SubblockFormVariant } from "../../data/subblockForm.data";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { CHEVRON_SECONDARY__ICON } from "@/shared/ui/Icon/data/chevron.data.icon";
import { Axis } from "@/shared/model/button.model";

interface HeaderSubblockFormProps {
    title: string
    variant?: SubblockFormVariant
    isOpen?: boolean
    onClickHeader?: Function
    className?: string,
}

export const HeaderSubblockForm:FC<HeaderSubblockFormProps> = ({
    title, 
    variant=SubblockFormVariant.Static, isOpen, 
    onClickHeader=()=>{},
    className
}) => {
    
    return (
        <div className={cls(cl.header, className)}>
            <span className={cl.title}>{title}</span>
            {variant === SubblockFormVariant.Toggle && (
                <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Secondary} size={ButtonSize.Medium} 
                        beforeImage={CHEVRON_SECONDARY__ICON} beforeProps={{axis: (isOpen ? Axis.Top : Axis.Bottom)}}
                        onClick={onClickHeader} className={cl.button} />
            )}
        </div>
    )
}
