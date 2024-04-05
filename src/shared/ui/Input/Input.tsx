import { ReactNode } from "react"
import InputList from "./List/InputList"
import { InputText } from "./Text"
import { InputRadio } from "./Radio"
import InputSelect from "./Select/ui/InputSelect"

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
