import { ReactNode } from "react"
import { InputText } from "./ui/Text"
import { InputDoubleText } from "./ui/DoubleText"
import { InputSelect } from "./ui/Select/ui/InputSelect"
import { TextAndSelectInput } from "./ui/TextAndSelect"
import { InputRadio } from "./ui/Radio"
import InputList from "./ui/List/InputList"
import { InputCheckbox } from "./ui/Checkbox"
import { RecursiveSelectInput } from "./ui/RecursiveSelect"
import { InputFile } from "./ui/File/ui/InputFile"
import { InputAddition } from "./ui/Addition/InputAddition"
import { InputImage } from "./ui/Image/ui/InputImage"

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
Input.RecursiveSelect = RecursiveSelectInput
Input.TextAndSelect = TextAndSelectInput
Input.Radio = InputRadio
Input.List = InputList
Input.Checkbox = InputCheckbox
Input.File = InputFile
Input.Image = InputImage
Input.Addition = InputAddition

