import { FC, ReactNode } from "react"
import { SubblockChildText } from "./Text/SubblockChildText"

interface SubblockChildProps{
    children: ReactNode,
}


export default function SubblockChild({children}: SubblockChildProps) {
    return (
        {children}
    )
}


SubblockChild.Text = SubblockChildText