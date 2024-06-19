import { ReactNode } from "react"
import InputList from "./List/InputList"
import { InputText } from "./Text"
import { InputRadio } from "./Radio"
import { InputDoubleText } from "./DoubleText"
import { TextAndSelectInput } from "./TextAndSelect"
import { InputSelect } from "./Select/ui/InputSelect"

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
