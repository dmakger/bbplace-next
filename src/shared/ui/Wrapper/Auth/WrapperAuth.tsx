"use client"

import { FC, ReactNode } from "react"
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { ModalAction } from "../../Modal/ui/Action/ModalAction";
import { EModalView } from "@/shared/data/modal.data";
import { EInputTextType } from "../../Input/ui/Text/data/text.input.data";
import cl from './_WrapperAuth.module.scss'
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WrapperMount } from "../Mount";
import SuspenseL from "../SuspenseL/SuspenseL";

interface WrapperAuthProps{
    children: ReactNode
}

export const WrapperAuth: FC<WrapperAuthProps> = ({...rest}) => {
    return (
        <SuspenseL>
            <WrapperAuthChild {...rest} />
        </SuspenseL>
    );
}


const WrapperAuthChild: FC<WrapperAuthProps> = ({ children }) => {
    // ROUTER
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

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
                router.push(MAIN_PAGES.LOGIN.path)
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
                actionCreators.setAuthOptional({
                    prevPath: `${pathname}?${searchParams.toString()}`
                })
            } else {
                router.push(MAIN_PAGES.REGISTRATION.path)
            }
        } catch (error) {
        }
    }
    const handleOnCloseModal = () => {
        router.back()
    }

    return (
        <WrapperMount>
            {isAuth ? (
                <>{children}</>
            ) : (
                <>
                    <div className={cl.fill}>
                        <h2 className={cl.title}>{"Этот блок доступен только для зарегистрированных пользователей"}</h2>
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
                        }} 
                        hasClose={true}
                        onClickOverlay={handleOnCloseModal} 
                        />
                </>
            )}
        </WrapperMount>
    );
}