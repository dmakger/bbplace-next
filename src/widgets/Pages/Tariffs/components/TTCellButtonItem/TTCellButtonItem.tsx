'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_TTCellButtonItem.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ETTVariants, ITTCellButtonItem } from '../../model/tariffs.model'
import { ButtonArrowWLine } from '@/shared/ui/Button/data/Arrow/WLine/ButtonArrowWLine'
import { TARIFFS_INFO_ARRAY } from '../../data/tariffs.data'


export const TTCellButtonItem = ({
    className,
    classNameData,
    variant = ETTVariants.DEFAULT,
    title,
    subtitle,
    buttonTitle,
    rowId

}: ITTCellButtonItem) => {

    //STATE
    const [is1024, setIs1024] = useState<boolean>(false)
    const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
    const [canScrollNext, setCanScrollNext] = useState<boolean>(false)

    const buttonHeight: number = 110;

    //ROUTER
    const router = useRouter();

    //EFFECT
    useEffect(() => {
        setCanScrollNext(rowId !== TARIFFS_INFO_ARRAY.length)
        setCanScrollPrev(rowId !== 1)
    }, [rowId])

    //HANDLE
    const onPrev = () => {
        const element = document.getElementById(rowId ? String(rowId - 1) : '');
        if (element) {
            const scrollPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: scrollPosition - buttonHeight, behavior: "smooth" });
        }
    };

    const onNext = () => {
        const element = document.getElementById(rowId ? String(rowId + 1) : '');
        if (element) {
            const scrollPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: scrollPosition - buttonHeight, behavior: "smooth" });
        }
    };

    return (
        <>
            <th className={cls(cl.TTCellButtonItem, cl[variant], classNameData ? cl[classNameData] : '', className)}>
                <ButtonArrowWLine isSecondary={false} onClick={onPrev} sizes={{ width: 20, height: 20 }}
                    className={cl.prevButton} disabled={!canScrollPrev} />

                <div className={cl.middleContainer}>
                    <h6 className={cl.title}>{title}</h6>
                    {subtitle && <span className={cl.subtitle}>{subtitle}</span>}
                    {buttonTitle && <Button
                        className={cl.button}
                        variant={variant === ETTVariants.DEMO ? ButtonVariant.CONTENT : ButtonVariant.FILL}
                        color={variant === ETTVariants.DEMO ? ButtonColor.Tertiary : ButtonColor.Primary}
                        size={is1024 ? ButtonSize.Medium : ButtonSize.Big}
                        title={buttonTitle}
                        disabled />}
                </div>

                <ButtonArrowWLine isSecondary={false} onClick={onNext} sizes={{ width: 20, height: 20 }}
                    className={cl.nextButton} disabled={!canScrollNext} />
            </th>
            <HandleSize width={1024} set={setIs1024} />
        </>

    )
}
