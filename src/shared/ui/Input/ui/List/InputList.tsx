import { ReactNode } from "react"
import InputListRadio from "./Radio/InputListRadio"

interface InputListProps {
    children: ReactNode
}

export default function InputList({children}: InputListProps) {
    return (
        {children}
    )
}

InputList.Radio = InputListRadio

