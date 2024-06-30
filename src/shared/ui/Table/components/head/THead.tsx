import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import { ITable } from "../../model/table.model";
import { TableVariant } from "../../data/table.data";

interface THeadProps {
    head: ITable['head']
    variant?: ITable['variant']
    className?: string,
}

export const THead:FC<THeadProps> = ({head, variant=TableVariant.WHITE, className}) => {
    return (
        <thead className={cls(className)}>
            <tr>
                {head.map((it, index) => (
                    <th scope="col" key={index}>{it === undefined ? '' : it}</th>
                ))}
            </tr>
        </thead>
    )
}
