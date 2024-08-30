"use client"

import cl from './_MenuButton.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { Button } from '../..'
import { ButtonColor, ButtonSize, ButtonVariant, EMenuButtonVariant, IMenuButton } from '../../model/button.model'
import { usePathname, useRouter } from 'next/navigation'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'
import { GLOBE_ICON } from '@/shared/ui/Icon/data/globe.data.icon';
import { ECurrentLK } from '@/entities/User/model/user.model'
import { saveCurrentLKTokenStorage } from '@/entities/User/lib/user-token.lib'

export const MenuButton = ({
    className,
    variant = EMenuButtonVariant.LINK,
    title,
    link,
    notificationCounter,
    onClick
}: IMenuButton) => {

    //ROUTER
    const pathname = usePathname();
    const router = useRouter();

    //RTK
    const {currentLK} = useAppSelector(state => state.user)
    const actionCreators = useActionCreators();

    //FUNCTIONS
    const logOut = () => {
        actionCreators.setNotAuth();
        router.push(MAIN_PAGES.CHECK_EMAIL.path);
    }

    const handleOnClick = () => {
        onClick && onClick();
        if(variant === EMenuButtonVariant.SWITCH_LK){
            const actualCurrentLK = currentLK === ECurrentLK.BUYER ? ECurrentLK.SELLER : ECurrentLK.BUYER
            actionCreators.setAuthOptional({
                currentLK: actualCurrentLK
            })
            saveCurrentLKTokenStorage(actualCurrentLK)
        }
    }

    const editProfile = () => router.push(DASHBOARD_PAGES.PROFILE_EDIT.path);

    const isActive = pathname === link && variant !== EMenuButtonVariant.SWITCH_LK;
        
    const renderButton = () => (
        <Button
            title={title}
            href={link}
            className={cls(
                className,
            cl.MenuButton,
                cl[variant],
                (variant === EMenuButtonVariant.LINK && pathname === link) ? cl.activeLink
                    // : (variant === EMenuButtonVariant.LOCALIZATION && true) ? cl.activeLang 
                    : ''
            )}
            linkTarget={link?.includes('pdf') ? '_target' : ''}
            variant={ButtonVariant.CLEAR}
            afterImage={variant === EMenuButtonVariant.LOCALIZATION ? GLOBE_ICON : undefined}
            afterProps={{ width: 20, height: 20 }}
            afterText={notificationCounter ?? ''}
            disabled={isActive}
            classNameAfterText={cl.notificationCounter}
            color={variant === EMenuButtonVariant.LINK ? ButtonColor.Secondary : ButtonColor.Tertiary}
            onClick={handleOnClick}
        />
    );

    const renderProfileButtons = () => (
        <div className={cls(cl.profileButtons, className)}>
            <Button title='Выйти' variant={ButtonVariant.CONTENT} size={ButtonSize.Small} color={ButtonColor.Negative} onClick={logOut} />
            <Button title='Изменить' variant={ButtonVariant.BORDER} color={ButtonColor.Secondary} size={ButtonSize.Small} className={cl.buttonEdit} onClick={editProfile} />
        </div>
    );

    return (
        <>
            {variant !== EMenuButtonVariant.PROFILE_BUTTONS ? renderButton() : renderProfileButtons()}
        </>
    );
}
