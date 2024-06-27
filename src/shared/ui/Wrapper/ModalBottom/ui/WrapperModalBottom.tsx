
import cl from './_WrapperModalBottom.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { XMARK_HOVERED_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { ReactNode } from 'react'
import { cls } from '@/shared/lib/classes.lib'

interface IWrapperModalBottom {
    setIsOpen: Function,
    title?: string,
    topChildren?: ReactNode,
    bottomChildren?: ReactNode,
    classNameTopChild?: string,
    classNameBottomChild?: string
}

export const WrapperModalBottom = ({
    setIsOpen,
    title,
    topChildren,
    bottomChildren,
    classNameTopChild,
    classNameBottomChild
}: IWrapperModalBottom) => {
    return (
        <div className={cl.modalBelowWrapper}>
            <Button variant={ButtonVariant.DEFAULT}
                beforeImage={XMARK_HOVERED_ICON}
                beforeProps={{ width: 27, height: 27 }}
                className={cl.xmarkButton}
                onClick={() => setIsOpen(false)} />
            {(topChildren || title) && <div className={cls(cl.topContainer, classNameTopChild )}>
                {topChildren}
                <h4>
                    {title}
                </h4>
            </div>}
            <div className={cls(cl.bottomChildren, classNameBottomChild)}>
                {bottomChildren}
            </div>
        </div>
    )
}
