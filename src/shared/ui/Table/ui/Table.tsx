import { FC } from "react"

import cl from './_Table.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { ITable } from "../model/table.model";
import { THead } from "../componets/Head/THead";
import { TBody } from "../componets/Body/TBody";
import { TableVariant } from "../data/table.data";

interface TableProps extends ITable {
    className?: string,
}

export const Table:FC<TableProps> = ({head, data, unions, variant=TableVariant.WHITE, className}) => {
    return (
        <table className={cls(cl.table, cl[variant], className)}>
            <THead head={head} variant={variant}/>
            <TBody data={data} variant={variant} />
        </table>
    )
}
