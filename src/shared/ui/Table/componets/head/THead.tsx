import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_THead.module.scss'
import { ITable } from "../../model/table.model";
import { TableVariant } from "../../data/table.data";

interface THeadProps {
    head: ITable['head']
    variant?: ITable['variant']
    className?: string,
}

export const THead:FC<THeadProps> = ({head, variant=TableVariant.WHITE, className}) => {
    return (
        <thead className={cls(cl[variant], className)}>
            <tr>
                {head.map(it => (
                    <th scope="col">{it === undefined ? '' : it}</th>
                ))}
            </tr>
        </thead>
    )
}
