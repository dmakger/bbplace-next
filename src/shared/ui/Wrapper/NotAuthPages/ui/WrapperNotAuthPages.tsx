'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperNotAuthPages.module.scss'
import Image from "next/image"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { SUPPORT_ICON } from "@/shared/ui/Icon/data/support.data.icon"
import { ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES, MAIN_PAGES } from "@/config/pages-url.config"

interface IWrapperNotAuthPages{
    className?: string,
    pageTitle: string,
    children: ReactNode
}

export const WrapperNotAuthPages = ({
    className,
    pageTitle,
    children
}: IWrapperNotAuthPages) => {

    //ROUTER
    const router = useRouter();

    //FUNCTION
    const navigateToTheSupport = () => router.push(MAIN_PAGES.SUPPORT);

    const navigateToMainPage = () => router.push(MAIN_PAGES.HOME);
    
    return (
        <div className={cls(cl.WrapperNotAuthPages, className)}>
            <Image src='logo.svg' alt="logo" width={120} height={120}
             className={cl.logo}/>
            <div className={cl.formContainer}>
                <h4 className={cl.pageTitle}>{pageTitle}</h4>
                {children}
            </div>
            <div className={cl.buttonsContainer}>
                <Button variant={ButtonVariant.CONTENT}
                color={ButtonColor.Tertiary}
                size={ButtonSize.Medium}
                beforeImage={ARROW_WLINE_TERTIARY_ICON}
                title="Назад"
                onClick={navigateToMainPage}
                />
                <Button variant={ButtonVariant.CONTENT}
                color={ButtonColor.Tertiary}
                beforeImage={SUPPORT_ICON}
                beforeProps={{ width: 18, height: 18}}
                size={ButtonSize.Medium}
                title="Поддержка"
                onClick={navigateToTheSupport}/>
            </div>
        </div>
    )
}
