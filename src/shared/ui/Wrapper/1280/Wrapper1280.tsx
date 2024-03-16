import { ReactNode } from 'react'
import cl from './_Wrapper1280.module.scss'
import { cls } from '@/shared/lib/classes.lib'

interface Wrapper1280Props {
    children?: ReactNode
    classNameWrapper?: string
    classNameContent?: string
}

export default function Wrapper1280({children, classNameWrapper, classNameContent}: Wrapper1280Props) {
    return (
        <div className={cls(cl.wrapper, classNameWrapper)}>
            <div className={cls(cl.content, classNameContent)}>
                {children}
            </div>
        </div>
    )
}
