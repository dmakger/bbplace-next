import { FC, ReactNode } from "react"
import cl from './_DefaultIcon.module.scss'

interface IDefaultIconProps{
    className?: string,
    classNameSelected?: string,
    isSelected?: boolean,
    onClick: () => void,
    children?: ReactNode;
}

export const DefaultIcon: FC<IDefaultIconProps> = ({ 
    isSelected,
    className = '',
    classNameSelected = '',
    onClick,
    children
}) => {
    return (
        <button className={`${cl.DefaultIcon} ${cl[className]} ${isSelected ? cl[classNameSelected] : ''}`}
            onClick={onClick}>
                {children}
            </button>
    )
}
