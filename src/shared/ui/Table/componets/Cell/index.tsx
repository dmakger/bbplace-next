import { ReactNode } from "react"
import { TableCellOption } from "./Option/TableCellOption"
import { TableCellText } from "./Text/TableCellText"

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
