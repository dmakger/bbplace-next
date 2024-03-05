import { ReactNode } from "react"
import InputText from "./Text/InputText"
import InputSelect from "./Select/InputSelect"

interface InputProps {
    children: ReactNode
}

export default async function Input({children}: InputProps) {
    return (
        {children}
    )
}

Input.Text = InputText
Input.Select = InputSelect