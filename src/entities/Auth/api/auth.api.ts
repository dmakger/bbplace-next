import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { ISupplier, ISupplierAPI } from "@/entities/Supplier/model/supplier.model";
import { options } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "../model/auth.model";
import { getAccessToken, getRefreshToken, getTokens, saveTokensStorage } from "../lib/auth-token.lib";


export const UserAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'auth/api/Authenticate'
    }),
    endpoints: (build) => ({
        //GET
        getUserData: build.query<ISupplierAPI, string>({
            query: (userId) => ({
                url: `/GetUserInfo?userId=${userId}`,
                method: 'POST',
                body: {}
            })
        }),

        login: build.mutation<IAuthForm, IAuthForm>({
            query: ({username, password}) => ({
                url: '/login',
                method: 'POST',
                body: {
                    username,
                    password,
                },
                responseHandler: async (response) => {
                    const data = await response.json() as IAuthResponse
                    saveTokensStorage(data)
                    return data
                },
            })
        }),

        refreshToken: build.mutation<IAuthForm, void>({
            query: () => ({
                url: `/refresh-token`,
                method: 'POST',
                body: {
                    accessToken: getAccessToken(),
                    refreshToken: getRefreshToken(),
                },
                responseHandler: async (response) => {
                    const data = await response.json() as IAuthResponse
                    saveTokensStorage(data)
                    return data
                },
            })
        }),
    
        // async logout() {
        //     removeFromStorage()
        // }
    })
})