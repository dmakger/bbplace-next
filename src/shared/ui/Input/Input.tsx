import { ReactNode } from "react"
import InputList from "./List/InputList"
import { InputText } from "./Text"
import { InputRadio } from "./Radio"
import InputSelect from "./Select/ui/InputSelect"
import { InputDoubleText } from "./DoubleText"
import { TextAndSelectInput } from "./TextAndSelect"

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
