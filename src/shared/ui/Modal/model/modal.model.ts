import { EModalView } from "@/shared/data/modal.data"
import { ReactNode } from "react"
import { EInputTextType } from "../../Input/ui/Text/data/text.input.data"
import { IButton } from "../../Button/ui/Button"

/**
 * Пропсы для `Input.Text` в `ModalAction`
 */
export interface IModalActionInput {
    type: EInputTextType
    labelText: string
    placeholder: string
    setText: (text: string) => void
    defaultValue?: string
}

/**
 * Пропсы для компонента `Modal`
 */
export interface IModal {
    isOpen?: boolean
    onClickOverlay?: Function
    view?: EModalView
    hasBlack?: boolean
    hasClose?: boolean
    propsButtonClose?: IButton
    
    buttonNode?: ReactNode
}