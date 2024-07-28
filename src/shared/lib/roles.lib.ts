export const getRoleName = (role: string | string[]): string | undefined => {
    const roles = Array.isArray(role) ? role : [role];

    if (roles.includes('Buyer')) {
        return 'Покупатель';
    } else if (roles.includes('Seller')) {
        return 'Продавец';
    }
}