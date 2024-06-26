
import cl from './_WrapperModalBottom.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { XMARK_HOVERED_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { ReactNode } from 'react'
import { cls } from '@/shared/lib/classes.lib'

interface IWrapperModalBottom {
    setIsOpen: Function,
    title?: string,
    topChildren?: ReactNode,
    isBorderTopOnBottomChild?: boolean,
    bottomChildren?: ReactNode,
    className?: string,
    classNameTitle?: string,
    classNameTopChild?: string,
    classNameBottomChild?: string
}

export const WrapperModalBottom = ({
    setIsOpen,
    title,
    topChildren,
    isBorderTopOnBottomChild = false,
    bottomChildren,
    className,
    classNameTitle,
    classNameTopChild,
    classNameBottomChild
}: IWrapperModalBottom) => {
    return (
        <div className={cls(cl.modalBelowWrapper, className)}>
            <Button variant={ButtonVariant.DEFAULT}
                beforeImage={XMARK_HOVERED_ICON}
                beforeProps={{ width: 27, height: 27 }}
                className={cl.xmarkButton}
                onClick={() => setIsOpen(false)} />
            {(topChildren || title) && <div className={cls(cl.topContainer, classNameTopChild )}>
                {topChildren}
                {title && <h4 className={cls(cl.title, classNameTitle)}>
                    {title}
                </h4>}
            </div>}
            <div className={cls(cl.bottomChildren, classNameBottomChild, isBorderTopOnBottomChild ? cl.wBorder : '')}>
                {bottomChildren}
            </div>
        </div>
    )
}
