'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button, ButtonVariant } from '../../Button'
import { ButtonArrowWOLine } from '../../Button/data/Arrow/WOLine/ButtonArrowWOLine'
import cl from './_Subblock.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { ButtonColor } from '../../Button/model/button.model'
import { ESubblockVariants } from '../model/subblock.model'
import { Axis } from '@/shared/model/button.model'
import { ARROW_SECONDARY_WO_ICON } from '../../Icon/data/arrow.data.icon'
import { Modal } from '../../Modal/Modal'
import { WrapperModalBottom } from '../../Wrapper/ModalBottom'
import { EModalView } from '@/shared/data/modal.data'

interface ISubblock {
    className?: string,
    classNameBottomContainer?: string,
    classNameMobileButtonTitle?: string,
    classNameModalTitle?: string,
    classNameBottomChild?: string,
    variant?: ESubblockVariants,
    title?: string,

    textChildren?: string,
    children?: ReactNode,
    childrenButton?: ReactNode,

    mobileButtonTitle?: string,
    wModal?: boolean,
    modalTitle?: string,
    topModalChildren?: ReactNode,
    bottomModalChildren?: ReactNode
}

export const Subblock = ({
    className,
    classNameBottomContainer,
    classNameMobileButtonTitle,
    classNameModalTitle,
    classNameBottomChild,
    variant = ESubblockVariants.DEFAULT,
    title,
    textChildren,
    children,
    childrenButton,
    mobileButtonTitle,
    wModal = false,
    modalTitle,
    topModalChildren,
    bottomModalChildren
}: ISubblock) => {

    // STATE
    const [isVisibleContainer, setIsVisibleContainer] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // EFFECT
    useEffect(() => {
        if (variant === ESubblockVariants.WO_ARROW_ICON) 
            setIsVisibleContainer(true);
    }, [isVisibleContainer])

    // FUNCTIONS
    const closeTheModal = () => setIsModalOpen(false);

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
                    variant === ESubblockVariants.DEFAULT && isVisibleContainer ? cl.visible : '',
                    classNameBottomContainer
                )}>
                    {textChildren ? (
                        <p className={cl.text}>
                            {textChildren}
                        </p> 
                    ) : (
                        <div className={cl.children}>
                            {children}
                        </div>
                    )}

                    {childrenButton}
                </div>
            </div>
            {wModal && <>
                <Button variant={ButtonVariant.CONTENT}
                    afterImage={ARROW_SECONDARY_WO_ICON}
                    afterProps={{ width: 13, height: 7, classNameImage: isModalOpen ? cl.active : '' }}
                    color={ButtonColor.Secondary}
                    title={mobileButtonTitle}
                    className={cls(cl.mobileSubblock, classNameMobileButtonTitle)}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                />
                <Modal _isOpen={isModalOpen}
                    view={EModalView.BOTTOM}
                    buttonNode
                    onClickOverlay={closeTheModal}>
                    <WrapperModalBottom
                        title={modalTitle}
                        topChildren={topModalChildren}
                        classNameTitle={classNameModalTitle}
                        classNameBottomChild={classNameBottomChild}
                        bottomChildren={bottomModalChildren ?? textChildren}
                        setIsOpen={closeTheModal} />
                </Modal>
            </>}

        </div>
    )
}

