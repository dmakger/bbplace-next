import cl from './_TTHeadRow.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { TTCellButtonItem } from "../TTCellButtonItem/TTCellButtonItem"
import { BUTTONS_INFO_ARRAY } from "../../data/tariffs.data"

interface ITTHeadRow {
    className?: string
}

export const TTHeadRow = ({ className }: ITTHeadRow) => {
    return (
        <thead className={cls(cl.TTHeadRow, className)}>
            <tr>
                {BUTTONS_INFO_ARRAY.map(it => (
                    <TTCellButtonItem
                        key={it.rowId}
                        buttonTitle={it.buttonTitle}
                        title={it.title}
                        subtitle={it.subtitle}
                        variant={it.variant}
                        classNameData={it.classNameData}
                    />
                ))}
            </tr>
        </thead>
    )
}
