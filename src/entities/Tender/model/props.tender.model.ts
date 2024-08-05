export interface IPropsTenderBase {
    name: string
    categoryId: number
    currency: string
    description: string
    shareContacts: boolean
    attachments: string
}

/**
 * Необходим для пробрасывания данных по URL: `tender/api/Tenders/AddSaleRequest`
 */
export interface IPropsTenderSale extends IPropsTenderBase {
    price: number,
    minOrder: number,
    minOrderUnits: string,
    bulkDiscounts: boolean | null,
}


/**
 * Необходим для пробрасывания данных по URL: `tender/api/Tenders/AddPurchaseRequest`
 */
export interface IPropsTenderPurchase extends IPropsTenderBase {
    quantity: number,
    quantityUnits: string,
    maximumBudget: number,
}