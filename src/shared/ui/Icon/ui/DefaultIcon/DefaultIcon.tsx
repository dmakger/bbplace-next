import { FC, ReactNode } from "react"
import cl from './_DefaultIcon.module.scss'
import Link from "next/link"
import { cls } from "@/lib/classes"

interface IDefaultIconProps{
    className?: string,
    classNameSelected?: string,
    classNameText?: string,
    isSelected?: boolean,
    onClick: () => void,
    children?: ReactNode,
    link?: string,
    textLink?: string
}

export const DefaultIcon: FC<IDefaultIconProps> = ({ 
    isSelected,
    className = '',
    classNameSelected = '',
    classNameText = '',
    onClick,
    children,
    link,
    textLink

}) => {
    return (
        <>
            {!link ? <button className={cls(cl.DefaultIcon, cl[className], isSelected ? cl[classNameSelected] : '')}
                onClick={onClick}>
                {children}
            </button> : 
            <Link href={link} className={cl.linkButton}>
                {children}
                <p className={cl[classNameText]}>{textLink}</p>
            </Link>}
        </>
        
    )
}
