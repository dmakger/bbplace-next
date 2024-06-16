import { FC } from "react"

import cl from './_Table.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { ITable } from "../model/table.model";
import { THead } from "../componets/head/THead";

interface TableProps extends ITable {
    className?: string,
}

export const Table:FC<TableProps> = ({head, data, unions, className}) => {
    return (
        <table className={cls(className)}>
            <THead head={head} />
        </table>
    )
}
