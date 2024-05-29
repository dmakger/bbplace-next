import { ReactNode } from "react"

export interface IHeadingToText {
    heading?: string
    body: string | ReactNode
    unit?: string
}

export enum EHeadingToTextVariants {
    ROW = 'row',
    COLUMN = 'column'
}