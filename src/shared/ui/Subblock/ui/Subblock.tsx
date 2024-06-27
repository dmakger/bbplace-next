'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, ButtonVariant } from '../../Button'
import { ButtonArrowWOLine } from '../../Button/data/Arrow/WOLine/ButtonArrowWOLine'
import cl from './_Subblock.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { ButtonColor } from '../../Button/model/button.model'
import { ESubblockVariants } from '../model/subblock.model'
import { Axis } from '@/shared/model/button.model'
import { ARROW_SECONDARY_WO_ICON } from '../../Icon/data/arrow.data.icon'

interface ISubblock {
    className?: string,
    variant?: ESubblockVariants,
    title?: string,
    textChildren?: string,
    children?: ReactNode,
    childrenButton?: ReactNode,
    wModal?: boolean
}

export const Subblock = ({
    className,
    variant = ESubblockVariants.DEFAULT,
    title,
    textChildren,
    children,
    childrenButton,
    wModal = false
}: ISubblock) => {

    //STATE
    const [isVisibleContainer, setIsVisibleContainer] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // //EFFECT
    useEffect(() => {
        if (variant === ESubblockVariants.WO_ARROW_ICON) {
            setIsVisibleContainer(true);
        }
    }, [isVisibleContainer])


    return (
        <div className={cls(cl.Subblock, className)}>
            <div className={cls(cl.DesktopWrapper, wModal ? cl.displayNone : cl.desktopVariant)}>
                <div className={cl.topContainer}>

                    <h5 className={cl.title}>
                        {title}
                    </h5>

                    {variant === ESubblockVariants.DEFAULT && <ButtonArrowWOLine
                        axis={isVisibleContainer ? Axis.Top : Axis.Default}
                        className={cl.arrowButton}
                        classNameImage={cl.arrowIcon}
                        onClick={() => setIsVisibleContainer(!isVisibleContainer)} />}

                </div>

                <div className={cls(
                    cl.bottomContainer,
                    variant === ESubblockVariants.DEFAULT ? cl.hiddenContainer : '',
                    variant === ESubblockVariants.DEFAULT && isVisibleContainer ? cl.visible : ''
                )}>

                    {textChildren ? <p className={cl.text}>
                        {textChildren}
                    </p> :
                        <div className={cl.children}>
                            {children}
                        </div>}

                    {childrenButton}
                </div>
            </div>

            {wModal && <Button variant={ButtonVariant.CONTENT}
            afterImage={ARROW_SECONDARY_WO_ICON}
            afterProps={{width: 13, height: 7, classNameImage: isModalOpen ? cl.active : ''}}
                color={ButtonColor.Secondary}
                title='Title'
                className={cls(cl.mobileSubblock)}
                onClick={() => setIsModalOpen(!isModalOpen)}
            />}
        </div>
    )
}

