'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_FooterTopColumn.module.scss'
import { MenuButton } from '@/shared/ui/Button/data/Menu/MenuButton'
import { IMenuItem } from '@/shared/model/menu.model'
import { Subblock } from '@/shared/ui/Subblock'
import { IMenuButton } from '@/shared/ui/Button/model/button.model'
import { useState } from 'react'

interface IFooterTopColumn {
    className?: string,
    title: string,
    columnLinkData: IMenuItem[] | IMenuButton[]
}

export const FooterTopColumn = ({
    className,
    title,
    columnLinkData
}: IFooterTopColumn) => {

    //STATE
    const [isOpenSublock, setIsOpenSubblock] = useState<boolean>(false)

    //FUNCTION
    const closeTheModal = () => {
        isOpenSublock && setIsOpenSubblock(false)        
    }
    
    const renderMenuButtons = () => (
        <nav className={cl.linksContainer}>
            {columnLinkData.map((it, index) => (
                <MenuButton key={index} title={it.title} link={it.link} className={cl.menuLink} variant={(it as IMenuButton).variant} onClick={closeTheModal}/>
            ))}
        </nav>
    );

    return (
        <div className={cls(cl.FooterTopColumn, className)}>
            <div className={cl.desktop}>
                <h5 className={cl.title}>{title}</h5>
                {renderMenuButtons()}
            </div>
            <div className={cl.mobile}>
                <Subblock
                    mobileButtonTitle={title}
                    wModal
                    isOpen={isOpenSublock}
                    setIsOpen={setIsOpenSubblock}
                    modalTitle={title}
                    classNameBottomChild={cl.bottomChild}
                    classNameMobileButtonTitle={cl.mobileButtonTitle}
                    classNameModalTitle={cl.modalTitle}
                    bottomModalChildren={renderMenuButtons()}
                />
            </div>
        </div>
    );
}
