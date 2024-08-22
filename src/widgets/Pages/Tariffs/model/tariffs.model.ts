export enum ETCellVariants{
    DEFAULT = 'default',
    DEMO = 'demo',
    BUSINESS = 'business',
    PREMIUM = 'premium'
}

export interface ITCellItem{
    className?: string,
    classNameData?: string,
    variant?: ETCellVariants,
    title?: string,
    iconSrc?: string,
    subtitle?: string
}

export interface ITCellButtonItem extends ITCellItem{
    buttonTitle?: string
}
