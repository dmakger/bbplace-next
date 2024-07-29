"use client"

import cl from './_MenuButton.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { Button } from '../..'
import { ButtonColor, ButtonSize, ButtonVariant, EMenuButtonVariant, IMenuButton } from '../../model/button.model'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import GlobeIcon from '@/shared/assets/img/Globe/GlobeDefaultIcon.svg'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'



export const MenuButton = ({
    className,
    variant = EMenuButtonVariant.LINK,
    title,
    link,
    notificationCounter = false
}: IMenuButton) => {

    //ROUTER
    const pathname = usePathname()

    //RTK
    const { email } = useAppSelector(state => state.user);
    const actionCreators = useActionCreators()

    //ROUTER
    const router = useRouter()

    //FUNCTIONS
    const logOut = () => {
        actionCreators.setNotAuth();
        router.replace(MAIN_PAGES.LOGIN.path)
    }

    const editProfile = () => router.push(DASHBOARD_PAGES.PROFILE_EDIT.path);
    
    return (
        <>
            {variant !== EMenuButtonVariant.PROFILE_BUTTONS ?
                <button className={cls(
                    cl.MenuButton,
                    cl[variant],
                    className,
                    (variant === EMenuButtonVariant.LINK && pathname === link) ? cl.activeLink
                        : (variant === EMenuButtonVariant.LOCALIZATION && false) ? cl.activeLang : '')}>

                    <Button title={title}
                        href={link}
                        variant={ButtonVariant.CLEAR}
                        color={variant === EMenuButtonVariant.LINK ? ButtonColor.Secondary : ButtonColor.Tertiary}
                    />
                    {notificationCounter && <span className={cl.notificationCounter}>N</span>}
                    {variant === EMenuButtonVariant.LOCALIZATION && <Image src={GlobeIcon} alt='Globe' width={20} height={20} />}
                </button> 
                :
                <div className={cls(cl.MenuButton, cl[variant], className)}>
                    <Button title='Выйти' variant={ButtonVariant.CONTENT} size={ButtonSize.Small} color={ButtonColor.Negative} onClick={logOut} />
                    <Button title='Изменить' variant={ButtonVariant.BORDER} color={ButtonColor.Secondary} size={ButtonSize.Small} className={cl.buttonEdit} onClick={editProfile} />
                </div>}
        </>

    )
}
