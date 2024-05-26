import { ReactNode } from "react";


export interface IOptionTab {
    optionTab: ReactNode,
    optionQuantity?: number | null
}

export interface IOptionsTab {
    [key: string]: IOptionTab | undefined,
    description: IOptionTab,
    characteristics?: IOptionTab,
    reviews?: IOptionTab,
    supplier?: IOptionTab
}