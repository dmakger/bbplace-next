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
import { useAppSelector } from "@/storage/hooks"
import { LK_ICON } from "@/shared/ui/Icon/data/lk.data.icon"
import { IImageSizes } from "@/shared/model/image.model"

interface IWrapperForLogInNSupportPages {
    className?: string,
    pageTitle: string,
    children: ReactNode,
    formRef: RefObject<HTMLFormElement>
    onSubmitFunc: FormEventHandler<HTMLFormElement>,
    forgotPasswordButton?: boolean
}

export const WrapperForLogInNSupportPages = ({
    className,
    pageTitle,
    children,
    formRef,
    onSubmitFunc,
    forgotPasswordButton = false
}: IWrapperForLogInNSupportPages) => {

    //ROUTER
    const router = useRouter();

    //PATHNAME
    const pathname = usePathname()

    //RTK
    const { isAuth } = useAppSelector(state => state.user)  

    //VARIABLE
    const iconSizes: IImageSizes = { width: 18, height: 18 }; 

    //FUNCTION
    const navigateToTheSupport = () => router.push(MAIN_PAGES.SUPPORT.path);

    const navigateToTheLK = () => {
        if(!isAuth){
            return router.push(MAIN_PAGES.LOGIN.path)
        }
        router.push(DASHBOARD_PAGES.HOME.path);
    }

    const goBack = () => router.back();

    const navigateToTheForgotPassword = () => router.push(MAIN_PAGES.FORGOT_PASSWORD.path)

    return (
        <main className={cls(cl.WrapperForLogInNSupportPages, className)}>
            <Logo sizes={{ width: 120, height: 120 }}
                className={cl.logoButton} />
            <form className={cl.formContainer} onSubmit={onSubmitFunc} ref={formRef}>
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
            </form>

            <div className={cl.buttonsContainer}>
                <Button variant={ButtonVariant.CONTENT}
                    color={ButtonColor.Tertiary}
                    size={ButtonSize.Medium}
                    beforeImage={ARROW_WLINE_TERTIARY_ICON}
                    beforeProps={iconSizes}
                    title="Назад"
                    onClick={goBack}
                />
                {pathname.includes('support') ?
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
