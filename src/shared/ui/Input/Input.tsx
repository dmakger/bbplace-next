import { ReactNode } from "react"
import InputList from "./List/InputList"
import { InputSelect } from "./Select"
import { InputText } from "./Text"
import { InputRadio } from "./Radio"

interface InputProps {
    children: ReactNode
}

export default function Input({children}: InputProps) {
    return (
        {children}
    )
}

Input.Text = InputText
Input.Select = InputSelect
Input.Radio = InputRadio
Input.List = InputList
