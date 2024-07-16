
export interface IIcon {
    default: string
    defaultHovered?: string
    defaultPressed?: string

    active?: string
    activeHovered?: string
    activePressed?: string

    disabled?: string
    loading?: string
}

export interface IWarningIcon extends IIcon{
    negative?: string,
    positive?: string
}

/**
 * Наследует все поля из {IIcon}
 */
export interface IIconBoolean {
    defaultHovered?: boolean
    defaultPressed?: boolean

    active?: boolean
    activeHovered?: boolean
    activePressed?: boolean

    disabled?: boolean
    loading?: boolean
}

export enum FavouriteIconVariant{
    EMPTY = 'empty-heart',
    IN_CIRCLE_HEART = 'in-circle-heart'
}
