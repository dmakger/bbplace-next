import { ReactNode } from "react";


// ====={ CORE }=====
export interface IOptionTab {
    optionTab: ReactNode,
    optionValue?: string,
    optionQuantity?: number | null
}

export interface IOptionTabParent {
    [key: string]: IOptionTab | undefined,
}

// ====={ PRODUCT }=====
export interface IDetailedProductOptionsTab extends IOptionTabParent{
    description?: IOptionTab,
    characteristics?: IOptionTab,
    reviews?: IOptionTab,
    supplier?: IOptionTab,
}

export interface IUserProductsTab extends IOptionTabParent {
    active: IOptionTab,
    drafts: IOptionTab,
    woPrice?: IOptionTab 
}

export interface ICreateNewProductsTab extends IOptionTabParent {
    single: IOptionTab,
    multiple: IOptionTab,
}

export interface IPricesNDiscountsTab extends IOptionTabParent{
    pricesNDiscounts: IOptionTab,
}

// ====={ TENDER }=====
export interface IOptionTabTender extends IOptionTabParent {
    sale: IOptionTab
    purchase: IOptionTab
}

// ====={ FAVOURITES }=====
export interface IOptionTabFavourites extends IOptionTabParent {
    products: IOptionTab
    tenderPurchase: IOptionTab,
    tenderSale: IOptionTab,
    suppliers: IOptionTab
}


export type OptionsTabType = (
    IUserProductsTab | IDetailedProductOptionsTab | ICreateNewProductsTab | IPricesNDiscountsTab
    | IOptionTabTender | IOptionTabFavourites
);
