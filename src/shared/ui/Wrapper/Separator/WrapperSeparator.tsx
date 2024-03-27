import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperSeparator.module.scss'
import { ESeparator } from "@/shared/data/separator.data";

interface WrapperSeparatorProps{
    separator?: ESeparator
    className?: string,
    children: ReactNode[]
}

export const WrapperSeparator:FC<WrapperSeparatorProps> = ({separator=ESeparator.Point, className, children}) => {    
    const childrenData = children.filter(it => !!it)
    const elementsWithSeparator: JSX.Element[] = [];

    // Add first {children}
    if (childrenData.length > 0) {
        elementsWithSeparator.push(childrenData[0] as JSX.Element);
    }

    // Add next {children}s
    for (let i = 1; i < childrenData.length; i++) {
        elementsWithSeparator.push(
            <span key={`separator-${i}`} className={cls(cl.separator, className)}>
                {separator}
            </span>
        );
        elementsWithSeparator.push(childrenData[i] as JSX.Element);
    }

    return (
        <div className={cls(cl.wrapper, className)}>{elementsWithSeparator}</div>
    );

}
