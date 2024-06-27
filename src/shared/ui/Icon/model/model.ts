
export interface IIcon {
    default: string
    defaultHovered?: string
    defaultPressed?: string

    active?: string
    activeHovered?: string
    activePressed?: string
}

export interface IWarningIcon extends IIcon{
    negative?: string,
    positive?: string
}

export enum FavouriteIconVariant{
    EMPTY = 'empty-heart',
    IN_CIRCLE_HEART = 'in-circle-heart'
}
