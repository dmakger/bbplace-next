import { ECurrentLK } from "@/entities/User/model/user.model";

export const getRoleName = (role: string | string[]) => {

    if (Array.isArray(role) && role.includes('Supplier')) {
        return 'Поставщик';
    } else if (role === 'Supplier') {
        return 'Поставщик';
    }
    else{
        return 'Покупатель';
    }
}

export const getCurrentLKRoleName = (role: ECurrentLK) => {
    if(role === ECurrentLK.BUYER) {
        return 'Покупатель';
    } else if (role === ECurrentLK.SUPPLIER) {
        return 'Поставщик';
    }
}