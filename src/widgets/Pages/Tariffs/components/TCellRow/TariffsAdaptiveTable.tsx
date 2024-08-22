import { cls } from "@/shared/lib/classes.lib"
import cl from './_TariffsAdaptiveTable.module.scss'
import { TCellColumn } from "../TCellColumn/TCellColumn"
import { DEFAULT_COLUMN_DATA_ARRAY, DEMO_COLUMN_DATA_ARRAY, SECOND_DEFAULT_COLUMN_DATA_ARRAY } from "../../data/tariffs.data"
import { TCellButtonItem } from "../TCellButtonItem/TCellButtonItem"
import { ReactNode } from "react"
import { ITCellButtonItem, ITCellItem } from "../../model/tariffs.model"
import { TCellItem } from "../TCellItem/TCellItem"

interface ITariffsAdaptiveTable {
    className?: string,
    childrenButton: ReactNode,
    firstColumnData: ITCellItem[] | ITCellButtonItem[],
    secondColumnData?: ITCellItem[] | ITCellButtonItem[]
    hasFootnote?: boolean

}

export const TariffsAdaptiveTable = ({ 
    className,
    childrenButton,
    firstColumnData,
    secondColumnData,
    hasFootnote = false
 }: ITariffsAdaptiveTable) => {
    return (
        <table className={cls(cl.TariffsAdaptiveTable, className)}>
            {childrenButton}
            <div className={cl.firstTableContainer}>
                <TCellColumn columnData={DEFAULT_COLUMN_DATA_ARRAY} />
                <TCellColumn columnData={firstColumnData} />
            </div>
            {hasFootnote && <TCellItem
                title='Чем дольше партнёрство, тем выгоднее условия!'
                subtitle='* — зависит от продолжительности тарифа'
                className={cl.rowCell}
            />}
            {secondColumnData && <div className={cl.secondTableContainer}>
                <TCellColumn columnData={SECOND_DEFAULT_COLUMN_DATA_ARRAY} />
                <TCellColumn columnData={secondColumnData} />
            </div>}

        </table>
    )
}
