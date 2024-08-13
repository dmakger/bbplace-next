export const getRoleName = (role: string | string[]) => {

    if (Array.isArray(role) && role.includes('Seller')) {
        return 'Продавец';
    } else if (role === 'Seller') {
        return 'Продавец';
    }
}