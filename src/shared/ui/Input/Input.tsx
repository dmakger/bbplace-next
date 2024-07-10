import { ReactNode } from "react"
// <<<<<<< HEAD
import InputList from "./List/InputList"
import { InputText } from "./Text"
import { InputRadio } from "./Radio"
import { InputDoubleText } from "./DoubleText"
import { TextAndSelectInput } from "./TextAndSelect"
import { InputSelect } from "./Select"
// =======
// import { InputText } from "./ui/Text"
// import { InputDoubleText } from "./ui/DoubleText"
// import { InputSelect } from "./ui/Select/ui/InputSelect"
// import { TextAndSelectInput } from "./ui/TextAndSelect"
// import { InputRadio } from "./ui/Radio"
// import InputList from "./ui/List/InputList"
// import { InputCheckbox } from "./ui/Checkbox"
// >>>>>>> origin/master

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
Input.Checkbox = InputCheckbox

