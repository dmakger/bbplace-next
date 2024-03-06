import { ReactNode } from "react"
import InputText from "./Text/InputText"
import InputSelect from "./Select/InputSelect"
import InputRadio from "./Radio/InputRadio"

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