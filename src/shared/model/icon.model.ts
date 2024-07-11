import { ReactNode } from "react";
import { IIcon } from "../ui/Icon/model/model";

export interface IIconVariants {
    id: number,
    title?: string,
    image: IIcon,
    link?: string
}

export interface IIcons {
    width?: number,
    height?: number,
    className?: string
}

