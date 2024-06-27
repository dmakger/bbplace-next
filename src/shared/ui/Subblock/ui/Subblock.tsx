'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, ButtonVariant } from '../../Button'
import { ButtonArrowWOLine } from '../../Button/data/Arrow/WOLine/ButtonArrowWOLine'
import cl from './_Subblock.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { ButtonColor } from '../../Button/model/button.model'
import { ESubblockVariants } from '../model/subblock.model'

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
    // const [hiddenContainerHeight, setHiddenContainerHeight] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    //REF
    const hiddenContainerRef = useRef<HTMLDivElement>(null)

    // //EFFECT
    useEffect(() => {
        if (variant === ESubblockVariants.WO_ARROW_ICON) {
            setIsVisibleContainer(true);
        }
    }, [isVisibleContainer])


    return (
        <div className={cls(cl.Subblock, className)}>
            <div className={cls(cl.DesktopWrapper, wModal ? cl.displayNone : cl.desktopVariant)}>
                <div className={cls(cl.topContainer, isVisibleContainer ? cl.borderRadiusBottom : '')}>

                    <h5 className={cl.title}>
                        {title}
                    </h5>

                    {variant === ESubblockVariants.DEFAULT && <ButtonArrowWOLine
                        className={cl.arrowButton}
                        classNameImage={cl.arrowIcon}
                        onClick={() => setIsVisibleContainer(!isVisibleContainer)} />}

                </div>

                <div className={cls(
                    cl.bottomContainer,
                    variant === ESubblockVariants.DEFAULT ? cl.hiddenContainer : '',
                    variant === ESubblockVariants.DEFAULT && isVisibleContainer ? cl.visible : ''
                )}
                    ref={hiddenContainerRef}>
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
                color={ButtonColor.Secondary}
                title='Title'
                className={cl.mobileSubblock}
                onClick={() => setIsModalOpen(true)}
            />}
        </div>
    )
}

