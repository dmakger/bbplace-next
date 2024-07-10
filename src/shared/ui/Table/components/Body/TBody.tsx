import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TBody.module.scss'
import { ITable } from "../../model/table.model";
import { TableVariant } from "../../data/table.data";
import React from "react";

interface TBodyProps {
    data: ITable['data']
    variant?: ITable['variant']
    className?: string,
}

export const TBody: FC<TBodyProps> = ({ data, variant = TableVariant.WHITE, className }) => {
    return (
        <tbody className={cls(cl[variant], className)}>
            {data.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    <tr>
                        {row.row.map((cell, cellIndex) => {
                            const rowSpan = cellIndex === 0 && row.isShowRest
                                ? (row.rest && row.rest.length > 0 ? row.rest.length + 1 : 1)
                                : undefined;
                            return (
                                <td
                                    rowSpan={rowSpan}
                                    className={cls(cl.cell, cell.className)}
                                    key={cellIndex}
                                >
                                    {cell.cell}
                                </td>
                            );
                        })}
                    </tr>
                    {row.isShowRest && row.rest && row.rest.map((rowRest, restIndex) => (
                        <tr key={restIndex}>
                            {rowRest.map((cell, cellIndex) => (
                                <td className={cls(cl.cell, cell.className)} key={cellIndex}>
                                    {cell.cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </React.Fragment>
            ))}
        </tbody>
    );
};
