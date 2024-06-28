import { ReactNode } from "react";


export interface IOptionTab {
    optionTab: ReactNode,
    optionQuantity?: number | null
}

export interface IDetailedProductOptionsTab {
    [key: string]: IOptionTab | undefined,
    description?: IOptionTab,
    characteristics?: IOptionTab,
    reviews?: IOptionTab,
    supplier?: IOptionTab,
}

export interface IUserProductsTab {
    [key: string]: IOptionTab | undefined,
    active: IOptionTab,
    drafts: IOptionTab,
    woPrice?: IOptionTab 
}

export interface ICreateNewProductsTab {
    [key: string]: IOptionTab | undefined,
    single: IOptionTab,
    multiple: IOptionTab,
}