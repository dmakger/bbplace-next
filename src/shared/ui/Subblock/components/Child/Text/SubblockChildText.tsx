import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SubblockChildText.module.scss'

interface SubblockChildTextProps{
    textList: string[]
    className?: string,
}

export const SubblockChildText:FC<SubblockChildTextProps> = ({textList, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            {textList.map((text, index) => (
                <p key={index}>{text}</p>
            ))}
        </div>
    )
}
