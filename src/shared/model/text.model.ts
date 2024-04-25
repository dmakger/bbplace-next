import { ReactNode } from "react"

export interface IHeadingToText {
    heading: string
    text: string | ReactNode
}

export interface IHeadingToTextTender {
    heading: string
    text: string
    unit: string
}