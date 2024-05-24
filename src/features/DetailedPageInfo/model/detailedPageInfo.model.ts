import { ReactNode } from "react";


export interface IOptionTab {
    optionTab: ReactNode,
    optionQuantity?: number
}

export interface IOptionsTab {
    [key: string]: IOptionTab,
    description: IOptionTab,
    characteristics: IOptionTab,
    reviews: IOptionTab
}