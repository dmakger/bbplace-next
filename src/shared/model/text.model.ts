import { ReactNode } from "react"

export interface IHeadingToText {
    heading: string
    text: string | ReactNode
}

export enum EHeadingToTextVariants {
    ROW = 'row',
    COLUMN = 'column'
}