import { ReactNode } from "react";

export interface IIconVariants {
    id: number,
    title?: string,
    image: ReactNode,
    link?: string
}

export interface IIcons {
    width?: number,
    height?: number,
    className?: string
}
