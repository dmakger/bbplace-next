import { ReactNode } from "react";
import { IIcon } from "../ui/Icon/model/icon.model";

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

