import { ReactNode } from "react"
import { TableVariant } from "../data/table.data"

/**
 * Интерфейс для объединения колонок в таблицах
 * @param {number} start - начальная колонка, минимальное значение начинается 1
 * @param {number} end - конечная колонка
 */
export interface IUnionColumn {
    start: number
    end: number
}

export type ICell = ReactNode
export type IRow = ICell[]

export interface ITable {
    head: (string | undefined)[]
    data: IRow[]
    unions: IUnionColumn[]
    variant?: TableVariant
}