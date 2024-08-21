import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
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
    [ProductsTypeLK.Active]: IOptionTab,
    [ProductsTypeLK.Draft]: IOptionTab,
    [ProductsTypeLK.WithoutPrice]?: IOptionTab 
}

export interface ICreateNewProductsTab extends IOptionTabParent {
    single: IOptionTab,
    multiple: IOptionTab,
}

export interface IEditProductsTab extends IOptionTabParent {
    single: IOptionTab,
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


// ====={ CHAT }=====
export interface IOptionTabChat extends IOptionTabParent {
    chat: IOptionTab
}

// ============================
export type OptionsTabType = (
    IUserProductsTab | IDetailedProductOptionsTab 
    | ICreateNewProductsTab | IPricesNDiscountsTab
    | IOptionTabTender | IOptionTabFavourites
    | IOptionTabChat
);

// ====={ PROFILE }=====
export interface IProfileEditTab extends IOptionTabParent {
    profileEdit: IOptionTab
}
