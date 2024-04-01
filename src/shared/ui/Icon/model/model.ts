
export interface IIcon {
    default: string
    defaultHovered?: string

    active?: string
    activeHovered?: string
}

export enum FavouriteIconVariant{
    EMPTY = 'empty-heart',
    IN_CIRCLE_HEART = 'in-circle-heart'
}
