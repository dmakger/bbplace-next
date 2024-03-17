import Cookies from 'js-cookie'
import { IAuthResponse } from '../model/auth.model'

// ===={ ENUM }====
export enum ETokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken',
}

// ===={ GETTER }====
export const getTokens = () => {
    return {
        [ETokens.ACCESS_TOKEN]: getAccessToken(),
        [ETokens.REFRESH_TOKEN]: getRefreshToken(),
    } as IAuthResponse
}


export const getAccessToken = () => {
    const accessToken = Cookies.get(ETokens.ACCESS_TOKEN)
    return accessToken || null
}

export const getRefreshToken = () => {
    const refreshToken = Cookies.get(ETokens.REFRESH_TOKEN)
    return refreshToken || null
}

// ===={ SAVE }====
export const saveTokensStorage = (data: IAuthResponse) => {
    saveAccessTokenStorage(data.accessToken)
    saveRefreshTokenStorage(data.accessToken)
}

export const saveAccessTokenStorage = (accessToken: string) => {
    Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
        domain: process.env.CURRENT_DOMAIN,
        sameSite: 'strict',
        expires: 1,
    })
}

export const saveRefreshTokenStorage = (refreshToken: string) => {
    Cookies.set(ETokens.REFRESH_TOKEN, refreshToken, {
        domain: process.env.CURRENT_DOMAIN,
        sameSite: 'strict',
        expires: 1,
    })
}


// ===={ REMOVE }====
export const removeFromStorage = () => {
    Cookies.remove(ETokens.ACCESS_TOKEN)
    Cookies.remove(ETokens.REFRESH_TOKEN)
}