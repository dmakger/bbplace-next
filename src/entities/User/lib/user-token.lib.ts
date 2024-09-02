import Cookies from 'js-cookie';
import { ECurrentLK } from '../model/user.model';

export enum EUserTokens {
    'CURRENT_LK' = 'currentLK',
}

export const saveCurrentLKTokenStorage = (currentLK: ECurrentLK): void => {
    Cookies.set(EUserTokens.CURRENT_LK, currentLK, {
        domain: process.env.CURRENT_DOMAIN,
        sameSite: 'strict',
        expires: 1,
    });
};

export const getCurrentLKToken = (): ECurrentLK | undefined => {
    const currentLK = Cookies.get(EUserTokens.CURRENT_LK);    
    if(currentLK === ECurrentLK.BUYER) return ECurrentLK.BUYER
    else if(currentLK === ECurrentLK.SELLER) return ECurrentLK.SELLER;
};
