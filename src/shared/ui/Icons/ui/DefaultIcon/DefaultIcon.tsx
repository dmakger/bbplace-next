import { FC } from "react"
import cl from './_DefaultIcon.module.scss'

interface IDefaultIconProps{
    className?: string,
    classNameSelected?: string,
    image: string,
    isSelected?: boolean,
    onClick: () => void
}

export const DefaultIcon: FC<IDefaultIconProps> = ({ 
    image,
    isSelected,
    className = '',
    classNameSelected = '',
    onClick
}) => {
    return (
        <button className={`${cl.DefaultIcon} ${cl[className]} ${isSelected ? cl[classNameSelected] : ''}`}
            dangerouslySetInnerHTML={{ __html: image }}
            onClick={onClick} />
    )
}
