import { ReactNode } from "react";


// ====={ CORE }=====
export interface IOptionTab {
    optionTab: ReactNode,
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

// ====={ TENDER }=====
export interface IOptionTabTender extends IOptionTabParent {
    sale: IOptionTab
    purchase: IOptionTab
}

export type OptionsTabType = (
    IUserProductsTab | IDetailedProductOptionsTab | ICreateNewProductsTab
    | IOptionTabTender
);
