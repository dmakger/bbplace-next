'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperForLogInNSupportPages.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { SUPPORT_ICON } from "@/shared/ui/Icon/data/support.data.icon"
import { ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon"
import { FormEventHandler, ReactNode, RefObject } from "react"
import { usePathname, useRouter } from "next/navigation"
import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config"
import { Logo } from "@/shared/ui/Logo"
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { LK_ICON } from "@/shared/ui/Icon/data/lk.data.icon"
import { IImageSizes } from "@/shared/model/image.model"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { saveCurrentLKTokenStorage } from "@/entities/User/lib/user-token.lib"
import { ONLY_FOR_SELLERS_PAGES_ARRAY } from "@/widgets/Pages/OnlyForSellers/data/onlyForSellers.data"

interface IWrapperForLogInNSupportPages {
    className?: string,
    pageTitle?: string,
    children?: ReactNode,
    formRef?: RefObject<HTMLFormElement>
    onSubmitFunc?: FormEventHandler<HTMLFormElement>,
    forgotPasswordButton?: boolean,
    hasForm?: boolean,
    additionalBlockTitle?: string,
    childrenImage?: ReactNode,
    additionalBlockButtons?: ReactNode[]
}

export const WrapperForLogInNSupportPages = ({
    className,
    pageTitle,
    children,
    formRef,
    onSubmitFunc,
    forgotPasswordButton = false,
    hasForm = true,
    additionalBlockTitle,
    childrenImage,
    additionalBlockButtons
}: IWrapperForLogInNSupportPages) => {

    //ROUTER
    const router = useRouter();

    //PATHNAME
    const pathname = usePathname()

    //RTK
    const { isAuth, currentLK, photoId, prevPath } = useAppSelector(state => state.user)
    const actionCreators = useActionCreators();

    //FUNCTION

    const goBackByCurrentLK = () => {
        if (ONLY_FOR_SELLERS_PAGES_ARRAY.find(it => it === prevPath) && currentLK === ECurrentLK.BUYER) {            
            return router.back();
        }
        if (prevPath) return router.replace(prevPath);
        router.replace(DASHBOARD_PAGES.HOME.path)
    }

    const goBack = () => {
        goBackByCurrentLK()
        router.back();
    }

    const switchLK = () => {
        const actualCurrentLK = currentLK === ECurrentLK.BUYER ? ECurrentLK.SELLER : ECurrentLK.BUYER
        actionCreators.setAuthOptional({
            photoId: photoId,
            currentLK: actualCurrentLK
        })
        saveCurrentLKTokenStorage(actualCurrentLK)
        goBackByCurrentLK();
    }

    const navigateToTheSupport = () => router.push(MAIN_PAGES.SUPPORT.path);

    const navigateToTheLK = () => {
        if (!isAuth) {
            return router.push(MAIN_PAGES.LOGIN.path)
        }
        router.push(DASHBOARD_PAGES.HOME.path);
    }


    const navigateToTheForgotPassword = () => router.push(MAIN_PAGES.FORGOT_PASSWORD.path)

    //VARIABLE
    const iconSizes: IImageSizes = { width: 18, height: 18 };

    const isOnlyForSellers = pathname === MAIN_PAGES.ONLY_FOR_SELLERS.path;

    const additionalDefaultButtons: ReactNode[] = [
        <Button title='Главная' variant={ButtonVariant.TONAL} size={ButtonSize.Medium} href={MAIN_PAGES.HOME.path} className={cl.homeButton} />,
        <Button title='Профиль' variant={ButtonVariant.TONAL} size={ButtonSize.Medium} href={DASHBOARD_PAGES.HOME.path} />,
        isOnlyForSellers ? <Button title='Сменить роль' className={cl.changeRole} variant={ButtonVariant.FILL} size={ButtonSize.Medium} onClick={switchLK} /> :
            <Button title='Каталог' variant={ButtonVariant.FILL} size={ButtonSize.Medium} href={MAIN_PAGES.PRODUCTS.path} />
    ]

    return (
        <main className={cls(cl.WrapperForLogInNSupportPages, className)}>
            {childrenImage ? childrenImage : <Logo sizes={{ width: 120, height: 120 }}
                className={cl.logoButton} />}

            {hasForm && <form className={cl.formContainer} onSubmit={onSubmitFunc} ref={formRef}>
                <div className={cl.pageTitleContainer}>
                    <h4 className={cl.pageTitle}>{pageTitle}</h4>
                </div>
                {children}
                {forgotPasswordButton && <Button
                    className={cl.forgotPasswordButton}
                    title="Не помню пароль"
                    size={ButtonSize.Big}
                    variant={ButtonVariant.CONTENT}
                    color={ButtonColor.Secondary}
                    onClick={navigateToTheForgotPassword}
                />}
            </form>}

            {additionalBlockTitle && <div className={cl.additionalBlock}>
                <h5 className={cl.additionalBlockTitle}>
                    {additionalBlockTitle}
                </h5>
                <div className={cl.additionalBlockButtons}>
                    {(additionalBlockButtons ?? additionalDefaultButtons).map(it => it)}
                </div>
            </div>}

            <div className={cl.buttonsContainer}>
                <Button variant={ButtonVariant.CONTENT}
                    color={ButtonColor.Tertiary}
                    size={ButtonSize.Medium}
                    beforeImage={ARROW_WLINE_TERTIARY_ICON}
                    beforeProps={iconSizes}
                    title="Назад"
                    onClick={goBack}
                />
                {pathname.includes(MAIN_PAGES.SUPPORT.path) ?
                    <Button variant={ButtonVariant.CONTENT}
                        color={ButtonColor.Tertiary}
                        beforeImage={LK_ICON}
                        beforeProps={iconSizes}
                        size={ButtonSize.Medium}
                        title="Мой профиль"
                        onClick={navigateToTheLK} />
                    :
                    <Button variant={ButtonVariant.CONTENT}
                        color={ButtonColor.Tertiary}
                        beforeImage={SUPPORT_ICON}
                        beforeProps={iconSizes}
                        size={ButtonSize.Medium}
                        title="Поддержка"
                        onClick={navigateToTheSupport} />}
            </div>
        </main>
    )
}
