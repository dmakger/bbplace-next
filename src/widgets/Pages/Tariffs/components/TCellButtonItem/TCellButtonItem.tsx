'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_TCellButtonItem.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ETCellVariants, ITCellButtonItem } from '../../model/tariffs.model'


export const TCellButtonItem = ({
    className,
    variant = ETCellVariants.DEFAULT,
    title,
    subtitle,
    buttonTitle
}: ITCellButtonItem) => {

    //STATE
    const [is1024, setIs1024] = useState<boolean>(false)

    //ROUTER
    const router = useRouter();

    return (
        <>
            <td className={cls(cl.TCellButtonItem, cl[variant], className)}>
                <div className={cl.middleContainer}>
                    <h6 className={cl.title}>{title}</h6>
                    {subtitle && <span className={cl.subtitle}>{subtitle}</span>}
                    {buttonTitle && <Button
                        className={cl.button}
                        variant={variant === ETCellVariants.DEMO ? ButtonVariant.CONTENT : ButtonVariant.FILL}
                        color={variant === ETCellVariants.DEMO ? ButtonColor.Tertiary : ButtonColor.Primary}
                        size={is1024 ? ButtonSize.Medium : ButtonSize.Big}
                        title={buttonTitle} />}
                </div>
            </td>
            <HandleSize width={1024} set={setIs1024} />
        </>

    )
}
