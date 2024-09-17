import { createApi, BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import apiClient from './interceptor.auth.api';
import { IAuthForm, ILoginResponseDecoded, ICheckEmailExists, IRegistrationRequest, IResetPassword, ISendResetPassword, IUpdateUserInfo, IRegistrationResponse } from '../model/auth.model';
import { saveTokensStorage, getAccessToken, getRefreshToken, getHeaderAuthorizationIfExists, getHeaderAuthorization } from '../lib/auth-token.lib';
import { options } from '@/api/interceptors';
import { ISupplier, ISupplierAPI } from '@/entities/Supplier/model/supplier.model';
import { jwtDecode } from 'jwt-decode';
import { supplierApiToSupplier } from '@/entities/Supplier/lib/process.supplier.lib';

const axiosBaseQuery: BaseQueryFn<
    { url: string; method: AxiosRequestConfig['method']; data?: AxiosRequestConfig['data']; params?: AxiosRequestConfig['params'] },
    unknown,
    unknown
> = async ({ url, method, data, params }) => {
    try {
        const result = await apiClient({
            url,
            method,
            data,
            params,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export const UserAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getUserData: builder.query<ISupplier, string>({
            query: (userId) => ({
                url: `/Authenticate/GetUserInfo?userId=${userId}`,
                method: 'POST',
            }),
            transformResponse: (response: ISupplierAPI) => {
                const supplier = supplierApiToSupplier(response)!
                return supplier
            }
        }),
        getUserDataById: builder.mutation<ISupplierAPI, string>({
            query: (userId) => ({
                url: `/Authenticate/GetUserInfo?userId=${userId}`,
                method: 'POST',
            }),
            // transformResponse: (response: ISupplierAPI) => {
            //     console.log('qwe response', response)
            //     return supplierApiToSupplier(response)!
            // }
        }),
        updateUserInfo: builder.mutation<any, IUpdateUserInfo>({
            query: (data) => ({
                url: '/Authenticate/UpdateUserInfo',
                method: 'POST',
                data
            }),
            transformResponse: (response: any) => {
                saveTokensStorage(response); // Сохранение токенов в куки
                return jwtDecode(response.accessToken);
            }
        }),
        userLogin: builder.mutation<ILoginResponseDecoded, IAuthForm>({
            query: ({ username, password }) => ({
                url: '/Authenticate/login',
                method: 'POST',
                data: {
                    username,
                    password,
                },
            }),
            // transformResponse: (response: IAuthResponse) => {
            transformResponse: (response: any) => {
                saveTokensStorage(response); // Сохранение токенов в куки
                return jwtDecode(response.accessToken);
            }
        }),
        userRegistration: builder.mutation<IRegistrationResponse, IRegistrationRequest>({
            query: (body) => ({
                url: `/Authenticate/register`,
                method: 'POST',
                data: body,
                transformResponse: (response: any) => {
                    saveTokensStorage(response); // Сохранение токенов в куки
                    return jwtDecode(response.accessToken);
                }
            })
        }),
        refreshToken: builder.mutation<ILoginResponseDecoded, void>({
            query: () => ({
                url: `/Authenticate/refresh-token`,
                method: 'POST',
                data: {
                    accessToken: getAccessToken(),
                    refreshToken: getRefreshToken(),
                },
            }),
            transformResponse: (response: any) => {
                saveTokensStorage(response); // Сохранение токенов в куки
                return jwtDecode(response.accessToken);
            }
        }),
        checkEmailExists: builder.mutation<boolean, string>({
            query: (email: string) => ({
                url: `Authenticate/CheckEmailExists?email=${email}`,
                method: 'GET',
                headers: getHeaderAuthorizationIfExists(),
            }),
            transformResponse: (response: ICheckEmailExists) => response.exists,
        }),
        sendEmailConfirmation: builder.mutation<any, string>({
            query: (userId: string) => ({
                url: `Authenticate/SendEmailConfirmationLink?userId=${userId}`,
                method: 'POST',
                headers: getHeaderAuthorizationIfExists(),
            })
        }),
        //PASSWORD RESET
        sendResetPasswordLink: builder.mutation<any, ISendResetPassword>({
            query: (body) => ({
                url: `/Authenticate/SendResetPasswordLink`,
                method: 'POST',
                data: body,
            })
        }),
        resetPassword: builder.mutation<any, IResetPassword>({
            query: (body) => ({
                url: `/Authenticate/ResetPassword`,
                method: 'POST',
                data: body,
            })
        }),
    })
});

// export const { useGetUserDataQuery, useUserLoginMutation, useRefreshTokenMutation } = UserAPI;


export const TinAPI = createApi({
    reducerPath: 'TinAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'validations/api/Validations'
    }),
    endpoints: (build) => ({
        updateTIN: build.mutation<any, string>({
            query: (TIN) => ({
                url: `/RequestValidation/${TIN}`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                
            }),  
            transformResponse: (response: any) => {
                saveTokensStorage(response); // Сохранение токенов в куки
                return jwtDecode(response.accessToken);
            } 
        }),
    })
})