import { ReactNode } from "react"
import { TableVariant } from "../data/table.data"

/**
 * Интерфейс для объединения колонок в таблицах.
 * @param {number} start - начальная колонка. Счет начинается с 0
 * @param {number} end - конечная колонка. Не включительно
 * Если {start: 0, end: 2} => [0, 1] или [0, 2) 
 */
export interface IUnionColumn {
    start: number
    end: number
}

// export type ICell = ReactNode
export type ICell = {
    cell: ReactNode,
    className?: string,
}
// export type ICell = JSX.Element
export type _IRow = ICell[]
export type IRow = {
    row: _IRow,
    rest?: _IRow[]
    isShowRest?: boolean
}

export interface ITable {
    head: (string | undefined)[]
    data: IRow[]
    unions: IUnionColumn[],
    unionsRest?: IUnionColumn[],
    wrapperForUnions?: React.FC<{
        className?: string,
        children?: ReactNode
    }>
    variant?: TableVariant

    headTop?: ReactNode
    isVisibleHeadTop?: boolean

    showDefaultBody?: boolean
    defaultBody?: ReactNode
}