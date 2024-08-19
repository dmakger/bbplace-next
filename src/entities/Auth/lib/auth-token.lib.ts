import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
}

export enum ETokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = (): string | null => {
    const accessToken = Cookies.get(ETokens.ACCESS_TOKEN);
    return accessToken || null;
};

export const getRefreshToken = (): string | null => {
    const refreshToken = Cookies.get(ETokens.REFRESH_TOKEN);
    return refreshToken || null;
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (e) {
        return true;
    }
};


export const isAuth = (): boolean => {
    const accessToken = getAccessToken();
    if (!accessToken) return false;
    return !isTokenExpired(accessToken);
};

export const saveTokensStorage = (data: IAuthResponse): void => {    
    saveAccessTokenStorage(data.accessToken);
    saveRefreshTokenStorage(data.refreshToken);
};

export const getHeaderAuthorization = () => {
    return {
        'Authorization': `Bearer ${getAccessToken()}`
    }
}

export const getHeaderAuthorizationIfExists = () => {
    return isAuth() ? getHeaderAuthorization() : {}
}

export const saveAccessTokenStorage = (accessToken: string): void => {
    Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
        domain: process.env.CURRENT_DOMAIN,
        sameSite: 'strict',
        expires: 1,
    });
};

export const saveRefreshTokenStorage = (refreshToken: string): void => {
    Cookies.set(ETokens.REFRESH_TOKEN, refreshToken, {
        domain: process.env.CURRENT_DOMAIN,
        sameSite: 'strict',
        expires: 1,
    });
};

export const removeFromStorage = (): void => {
    Cookies.remove(ETokens.ACCESS_TOKEN);
    Cookies.remove(ETokens.REFRESH_TOKEN);
};
