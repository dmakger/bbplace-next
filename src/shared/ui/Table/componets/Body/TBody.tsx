import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TBody.module.scss'
import { ITable } from "../../model/table.model";
import { TableVariant } from "../../data/table.data";

interface TBodyProps {
    data: ITable['data']
    variant?: ITable['variant']
    className?: string,
}

export const TBody:FC<TBodyProps> = ({data, variant=TableVariant.WHITE, className}) => {
    return (
        <tbody className={cls(cl[variant], className)}>
            {data.map((row, index) => (
                <tr key={index}>{row.map((cell, index) => (
                    <td className={cls(cl.cell, cell.className)} key={index}>{cell.cell}</td>
                ))}</tr>
            ))}
        </tbody>
    )
}
