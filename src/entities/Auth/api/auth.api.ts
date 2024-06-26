import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import apiClient from './interceptor.auth.api';
import { ISupplierAPI } from '@/entities/Supplier/model/supplier.model';
import { IAuthForm, ILoginResponseDecoded, IAuthResponse } from '../model/auth.model';
import { saveTokensStorage, getAccessToken, getRefreshToken } from '../lib/auth-token.lib';
import { jwtDecode } from 'jwt-decode';

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
        getUserData: builder.query<ISupplierAPI, string>({
            query: (userId) => ({
                url: `/Authenticate/GetUserInfo?userId=${userId}`,
                method: 'POST',
            }),
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
    }),
});

// export const { useGetUserDataQuery, useUserLoginMutation, useRefreshTokenMutation } = UserAPI;
