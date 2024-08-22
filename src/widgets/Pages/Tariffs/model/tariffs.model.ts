import { ReactNode } from "react";

export enum ETCellItemVariants{
    DEFAULT = 'default',
    DEMO = 'demo',
    BUSINESS = 'business',
    PREMIUM = 'premium'
}

export interface ITCellItem{
    className?: string,
    classNameData?: string,
    variant?: ETCellItemVariants,
    title: string | ReactNode,
    subtitle?: string
}

export interface ITCellButtonItem extends ITCellItem{
    buttonTitle?: string
}