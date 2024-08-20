"use client"

import { FC, ReactNode, useState } from "react"
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { ModalAction } from "../../Modal/ui/Action/ModalAction";
import { EModalView } from "@/shared/data/modal.data";
import { EInputTextType } from "../../Input/ui/Text/data/text.input.data";
import cl from './_WrapperAuth.module.scss'
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { useRouter } from "next/navigation";

interface WrapperAuthProps{
    children: ReactNode
}

export const WrapperAuth: FC<WrapperAuthProps> = ({ children }) => {
    // ROUTER
    const router = useRouter()

    // RTK
    const { isAuth } = useAppSelector(state => state.user);
    const actionCreators = useActionCreators();

    // API
    const [triggerCheckEmailExists] = UserAPI.useCheckEmailExistsMutation()

    // HANDLE
    const handleEmail = async (emailValue: string) => {
        if (!emailValue) return
        try {
            const isExists = await triggerCheckEmailExists(emailValue).unwrap()

            if (isExists) {
                isExists && router.push(MAIN_PAGES.LOGIN.path)
                actionCreators.setAuth({
                    UserName: emailValue,
                    UserId: "",
                    FullName: "",
                    LegalName: "",
                    BrandName: "",
                    Role: "",
                    MobilePhone: "",
                    Country: ""
                })
            }

            !isExists && router.push(MAIN_PAGES.REGISTRATION.path)

        } catch (error) {
        }
    }

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <>
            {isAuth ? (
                <>{children}</>
            ) : (
                <>
                    <div className={cl.fill}>
                        <h2 className={cl.title}>Этот блок доступен только для зарегистрированных пользователей</h2>
                    </div>
                    <ModalAction 
                        title={"Зарегистрируйтесь или войдите в профиль"} 
                        isOpen={true} view={EModalView.BOTTOM}
                        hasBackground={true}
                        inputProps={{
                            labelText: "Электронная почта",
                            placeholder: "Введите email",
                            setText: handleEmail,
                            type: EInputTextType.Email
                        }} />
                </>
            )}
        </>
    );
}
