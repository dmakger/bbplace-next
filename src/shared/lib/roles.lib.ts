import { ECurrentLK } from "@/entities/User/model/user.model";

export const getRoleName = (role: string | string[]) => {

    if (Array.isArray(role) && role.includes('Seller')) {
        return 'Продавец';
    } else if (role === 'Seller') {
        return 'Продавец';
    }
    else{
        return 'Покупатель';
    }
}

export const getCurrentLKRoleName = (role: ECurrentLK) => {
    if(role === ECurrentLK.BUYER) {
        return 'Покупатель';
    } else if (role === ECurrentLK.SELLER) {
        return 'Продавец';
    }
}