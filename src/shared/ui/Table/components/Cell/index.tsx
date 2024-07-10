import { ReactNode } from "react"
import { TableCellOption } from "./Option/TableCellOption"
import { TableCellText } from "./Text/TableCellText"
import { TableCellCheckbox } from "./Checkbox/TableCellCheckbox"
import { TableCellToggle } from "./Toggle/TableCellToggle"

interface TableCellProps {
    children: ReactNode
}

export default function TableCell({children}: TableCellProps) {
    return (
        {children}
    )
}

TableCell.Option = TableCellOption
TableCell.Text = TableCellText
TableCell.Checkbox = TableCellCheckbox
TableCell.Toggle = TableCellToggle
