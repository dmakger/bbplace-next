import { ReactNode } from "react"
import { TableCellOption } from "./Option/TableCellOption"

interface TableCellProps {
    children: ReactNode
}

export default function TableCell({children}: TableCellProps) {
    return (
        {children}
    )
}

TableCell.Option = TableCellOption