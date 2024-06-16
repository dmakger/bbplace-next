import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_THead.module.scss'
import { ITable } from "../../model/table.model";

interface THeadProps {
    head: ITable['head']
    className?: string,
}

export const THead:FC<THeadProps> = ({head, className}) => {
    return (
        <thead className={cls(className)}>
            <tr>
                {head.map(it => (
                    <th scope="col">{it === undefined ? '' : it}</th>
                ))}
            </tr>
        </thead>
    )
}
