"use client"

import { FC, useEffect, useState } from "react";
import cl from './_UpdateAuth.module.scss';
import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators, useAppSelector } from '@/storage/hooks';
import { getAccessToken, isAuth } from '@/entities/Auth/lib/auth-token.lib';
import { ILoginResponseDecoded, IUser } from '@/entities/Auth/model/auth.model';
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";
import { getCurrentLKToken } from "@/entities/User/lib/user-token.lib";
import { ECurrentLK } from "@/entities/User/model/user.model";
import { useNotify } from "@/features/Notify/lib/hooks";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model";
import { CHECK_MARK_TERTIARY_ICON } from "@/shared/ui/Icon/data/checkMark.data.icon";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { COOKIE_POLICY_DOCUMENT } from "@/shared/data/documents.data";


interface UpdateAuthProps { }

export const UpdateAuth: FC<UpdateAuthProps> = () => {
    //STATE
    const [is768, setIs768] = useState<boolean>(false);

    // API 
    const [refreshToken] = UserAPI.useRefreshTokenMutation();
    const [getUserDataById] = UserAPI.useGetUserDataByIdMutation();

    //NOTIFY
    const { notify } = useNotify();

    // RTK
    const actionCreators = useActionCreators();
    const { notifications } = useAppSelector(state => state.notify)

    //FUNCTIONS
    const setCookiesAgreement = () => sessionStorage.setItem('cookiesAgreement', 'agree');

    const showCookieAgreementNotification = () => {

        if (!sessionStorage.getItem('cookiesAgreement') && !isAuth()) {

            notify({
                button: [{
                    className: cl.notifyButton,
                    color: ButtonColor.Tertiary,
                    size: is768 ? ButtonSize.Medium : ButtonSize.Big,
                    variant: ButtonVariant.BORDER,
                    title: !is768 ? 'Я согласен с использованием cookie' : 'Используются cookie',
                    beforeImage: CHECK_MARK_TERTIARY_ICON,
                    onClick: setCookiesAgreement
                },
                {   
                    className: cl.linkButton,
                    color: ButtonColor.Secondary,
                    size: is768 ? ButtonSize.Medium : ButtonSize.Big,
                    variant: ButtonVariant.CONTENT,
                    title: 'Политика данных',
                    href: MAIN_PAGES.CURRENT_DOCUMENT(COOKIE_POLICY_DOCUMENT).path,
                    linkTarget: '_blank' 
                }]
            });
        }
    };

    // EFFECT
    useEffect(() => {

        async function initialRefresh() {

            if (isAuth()) {

                const userData = getAccessToken(true) as (ILoginResponseDecoded | null);
                if (userData !== null) {
                    actionCreators.setAuth(userData);
                    processUserData(userData.UserId)
                }

            } else {
                await refreshToken().unwrap().then(
                    data => {
                        actionCreators.setAuth(data)
                    }, e => {
                        // actionCreators.setNotAuth()
                        console.error(e)
                    }
                );
            }
        }

        initialRefresh();
        showCookieAgreementNotification();
        if(is768) actionCreators.deleteNotification(notifications[0]?.id)
    }, [refreshToken, is768]);

    // FUNC
    const processUserData = (userId: IUser['id']) => {
        getUserDataById(userId).then(r => {
            if ('error' in r) return

            const supplier = supplierApiToSupplier(r.data)
            if (supplier === undefined) return

            actionCreators.setAuthOptional({
                photoId: supplier.photoId,
                currentLK: getCurrentLKToken() ?? ECurrentLK.BUYER
            })
        })
    }

    return (
        <HandleSize width={768} set={setIs768} />
    )
}
