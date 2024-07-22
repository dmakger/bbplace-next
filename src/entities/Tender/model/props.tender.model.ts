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


/**
 * Необходим для пробрасывания данных по URL: `tender/api/Tenders/AddPurchaseRequest`
 */
export interface IPropsTenderPurchase {
    name: string,
    categoryId: number,
    quantity: number,
    quantityUnits: string,
    maximumBudget: number,
    currency: string,
    description: string,
    shareContacts: boolean,
    attachments: string
}