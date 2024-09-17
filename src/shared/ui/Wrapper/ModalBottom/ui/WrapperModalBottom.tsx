
import cl from './_WrapperModalBottom.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { XMARK_WHITE__ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { ReactNode } from 'react'
import { cls } from '@/shared/lib/classes.lib'


export interface IWrapperModalBottom {
    setIsOpen: Function,
    title?: string,
    isBorderTopOnBottomChild?: boolean,

    className?: string,
    classNameTitle?: string,
    classNameTopChild?: string,
    classNameBottomChild?: string
}


interface _IWrapperModalBottom extends IWrapperModalBottom {
    topChildren?: ReactNode,
    middleChildren?: ReactNode,
    bottomChildren?: ReactNode,
}

export const WrapperModalBottom = ({
    setIsOpen,
    title,
    
    topChildren,
    isBorderTopOnBottomChild = false,
    middleChildren,
    bottomChildren,

    className,
    classNameTitle,
    classNameTopChild,
    classNameBottomChild
}: _IWrapperModalBottom) => {
    return (
        <div className={cls(cl.modalBelowWrapper, className)}>
            <Button variant={ButtonVariant.DEFAULT}
                beforeImage={XMARK_WHITE__ICON}
                beforeProps={{ width: 27, height: 27 }}
                onClick={() => setIsOpen(false)} 
                className={cl.xmarkButton} />
            {(topChildren || title) && 
                <div className={cls(cl.topContainer, classNameTopChild )}>
                    {topChildren}
                    {title && 
                        <h4 className={cls(cl.title, classNameTitle)}>{title}</h4>
                    }
                </div>
            }
            {middleChildren}
            <div className={cls(cl.bottomChildren, isBorderTopOnBottomChild ? cl.wBorder : '', classNameBottomChild)}>
                {bottomChildren}
            </div>
        </div>
    )
}
