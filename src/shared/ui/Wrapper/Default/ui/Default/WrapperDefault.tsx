import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperDefault.module.scss'
import { IWrapperDefaultProps } from "../../model/default.wrapper.model";

interface WrapperDefaultProps extends IWrapperDefaultProps {
    childrenDefault?: ReactNode
}

export const WrapperDefault:FC<WrapperDefaultProps> = ({
    children, childrenDefault, 
    showDefault=true, 
    classNameWrapper,
    classNameDefault,
    className,
}) => {
    return (
        <div className={cls(cl.wrapper, classNameWrapper)}>
            {showDefault ? (
                <div className={cls(cl.default, classNameDefault)}>{childrenDefault}</div>
            ) : (
                <div className={className}>{children}</div>
            )}
        </div>
    )
}
