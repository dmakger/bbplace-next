import { ReactNode } from "react"
interface InputProps {
    children: ReactNode
}

export default function Input({children}: InputProps) {
    return (
        {children}
    )
}

Input.Text = InputText
Input.DoubleText = InputDoubleText
Input.Select = InputSelect
Input.TextAndSelect = TextAndSelectInput
Input.Radio = InputRadio
Input.List = InputList
