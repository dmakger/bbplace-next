'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperNotAuthPages.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { SUPPORT_ICON } from "@/shared/ui/Icon/data/support.data.icon"
import { ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon"
import { FormEventHandler, ReactNode, RefObject } from "react"
import { useRouter } from "next/navigation"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { Logo } from "@/shared/ui/Logo"

interface IWrapperNotAuthPages {
    className?: string,
    pageTitle: string,
    children: ReactNode,
    formRef: RefObject<HTMLFormElement>
    onSubmitFunc: FormEventHandler<HTMLFormElement>,
    forgotPasswordButton?: boolean
}

export const WrapperNotAuthPages = ({
    className,
    pageTitle,
    children,
    formRef,
    onSubmitFunc,
    forgotPasswordButton = false
}: IWrapperNotAuthPages) => {

    //ROUTER
    const router = useRouter();

    //FUNCTION
    const navigateToTheSupport = () => router.push(MAIN_PAGES.SUPPORT.path);

    const goBack = () => router.back();

    const navigateToTheForgotPassword = () => router.push(MAIN_PAGES.FORGOT_PASSWORD.path)

    return (
        <div className={cls(cl.WrapperNotAuthPages, className)}>
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
                    beforeProps={{ width: 18, height: 18 }}
                    title="Назад"
                    onClick={goBack}
                />
                <Button variant={ButtonVariant.CONTENT}
                    color={ButtonColor.Tertiary}
                    beforeImage={SUPPORT_ICON}
                    beforeProps={{ width: 18, height: 18 }}
                    size={ButtonSize.Medium}
                    title="Поддержка"
                    onClick={navigateToTheSupport} />
            </div>
        </div>
    )
}
