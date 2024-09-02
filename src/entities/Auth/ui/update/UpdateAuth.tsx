"use client"

import { FC, useEffect } from "react"

import { UserAPI } from '@/entities/Auth/api/auth.api';
import { useActionCreators } from '@/storage/hooks';
import { getAccessToken, isAuth, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib';
import { ILoginResponseDecoded, IUser } from '@/entities/Auth/model/auth.model';
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";
import { getCurrentLKToken } from "@/entities/User/lib/user-token.lib";
import { ECurrentLK } from "@/entities/User/model/user.model";


interface UpdateAuthProps{}

export const UpdateAuth:FC<UpdateAuthProps> = () => {
    // API 
    const [refreshToken] = UserAPI.useRefreshTokenMutation();
    const [getUserDataById] = UserAPI.useGetUserDataByIdMutation();
    
    // RTK
    const actionCreators = useActionCreators();

    // EFFECT
    useEffect(() => {
        async function initialRefresh() {
            if (isAuth()) {
                const userData = getAccessToken(true) as (ILoginResponseDecoded | null);
                if (userData !== null) {
                    actionCreators.setAuth(userData);
                    processUserData(userData.UserId)
                }
            }
            const data = await refreshToken().unwrap();
            if (data) {
                actionCreators.setAuth(data);
            } else {
                removeFromStorage();
            }
        }
        initialRefresh();
    }, [actionCreators, refreshToken]);

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
        <></>
    )
}
