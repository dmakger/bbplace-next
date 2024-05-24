export interface IHeadingToText {
    heading: string
    text: string
    unit?: string
}

export enum EHeadingToTextVariants {
    ROW = 'row',
    COLUMN = 'column'
}