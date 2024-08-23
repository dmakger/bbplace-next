export enum ETTVariants{
    DEFAULT = 'default',
    DEMO = 'demo',
    BUSINESS = 'business',
    PREMIUM = 'premium'
}

export interface ITTCellItem{
    className?: string,
    classNameData?: string,
    variant?: ETTVariants,
    title?: string,
    iconSrc?: string,
    subtitle?: string
}

export interface ITTCellButtonItem extends ITTCellItem{
    buttonTitle?: string,
    rowId?: number
}

export interface ITTBodyRowData{
    className?: string,
    default: ITTCellItem,
    demo?: ITTCellItem,
    business?: ITTCellItem,
    premium?: ITTCellItem,
    rowId?: number
}

export interface ITTBodyRow{
    items: ITTBodyRowData,
    isDemo?: boolean,
    isBusiness?: boolean,
    isPremium?: boolean,
    rowId?: number,
    variant?: ETTVariants
}

export interface ITariffsInfo{
    name: string,
    rowId: number
}