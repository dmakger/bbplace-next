import { IMainPageCardSliderBlock } from "@/features/MainPageCardSliderBlock/ui/MainPageCardSliderBlock"

export enum EArticleForSuppliersOrBuyersVariants{
    SUPPLIERS = 'suppliers',
    BUYERS = 'buyers'
}

export interface IArticleForSuppliersOrBuyersText{
    subtitle: string,
    text: string
}

export interface IPrimeItem{
    name: string,
    categoryId: number,
    quantity: number
}


export interface IMainPageCardSliderBlockItem extends Omit<IMainPageCardSliderBlock, 'className'>{
    
}