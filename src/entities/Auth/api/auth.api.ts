import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model";
import { options } from "@/api/interceptors";
import { IAuthForm, IAuthResponse, ILoginResponseDecoded } from "../model/auth.model";
import { getAccessToken, getRefreshToken, saveTokensStorage } from "../lib/auth-token.lib";
import { jwtDecode } from "jwt-decode";


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

        userLogin: build.mutation<ILoginResponseDecoded, IAuthForm>({
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
                    return jwtDecode<ILoginResponseDecoded>(data.accessToken)
                },
            })
        }),

        refreshToken: build.mutation<ILoginResponseDecoded, void>({
            query: () => ({
                url: `/refresh-token`,
                method: 'POST',
                body: {
                    accessToken: getAccessToken(),
                    refreshToken: getRefreshToken(),
                },
                responseHandler: async (response) => {
                    const data = await response.json() as IAuthResponse;
                    saveTokensStorage(data)
                    return jwtDecode<ILoginResponseDecoded>(data.accessToken)
                },
            })
        }),
    
        // async logout() {
        //     removeFromStorage()
        // }
    })
})