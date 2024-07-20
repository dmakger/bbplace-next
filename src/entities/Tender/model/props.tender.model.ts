/**
 * Необходим для пробрасывания данных по URL: `tender/api/Tenders/AddSaleRequest`
 */
export interface IPropsTenderSale {
    name: string,
    categoryId: number,
    price: number,
    currency: string,
    minOrder: number,
    minOrderUnits: string,
    bulkDiscounts: boolean | null,
    description: string,
    shareContacts: boolean,
    attachments: string
}