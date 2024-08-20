"use client"

import { FC, ReactNode, useState } from "react"
import { useAppSelector } from "@/storage/hooks";
import { ModalAction } from "../../Modal/ui/Action/ModalAction";
import { EModalView } from "@/shared/data/modal.data";
import { EInputTextType } from "../../Input/ui/Text/data/text.input.data";
import cl from './_WrapperAuth.module.scss'

interface WrapperAuthProps{
    children: ReactNode
}

export const WrapperAuth: FC<WrapperAuthProps> = ({ children }) => {
    // RTK
    const { isAuth } = useAppSelector(state => state.user);

    // Возвращаем null на сервере, чтобы избежать несоответствия в гидратации
    if (typeof window === 'undefined') {
        return null;
    }

    // HANDLE
    const handleEmail = (emailValue: string) => {
        console.log('qwe emailValue', emailValue)
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
