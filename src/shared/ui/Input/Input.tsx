import { ReactNode } from "react"
import InputText from "./text/InputText"

interface InputProps {
    children: ReactNode
}

export default async function Input({children}: InputProps) {
    return (
        {children}
    )
}

Input.Text = InputText