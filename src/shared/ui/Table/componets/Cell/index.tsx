import { ReactNode } from "react"
import { TableCellOption } from "./Option/TableCellOption"
import { TableCellText } from "./Text/TableCellText"
import { TableCellChildren } from "./Children/TableCellChildren"

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
TableCell.Children = TableCellChildren