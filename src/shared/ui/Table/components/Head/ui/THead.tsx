import { FC } from "react"

import cl from './_THead.module.scss';
import { cls } from '@/shared/lib/classes.lib';
import { ITable } from "../../../model/table.model";
import { TableVariant } from "../../../data/table.data";

interface THeadProps {
    head: ITable['head']
    variant?: ITable['variant']
    headTop?: ITable['headTop']
    isVisibleHeadTop?: ITable['isVisibleHeadTop']
    className?: string,
}

export const THead:FC<THeadProps> = ({head, variant=TableVariant.WHITE, headTop, isVisibleHeadTop, className}) => {
    return (
        <thead className={cls(cl.head, className)}>
            <tr className={cls(cl.headRow, !isVisibleHeadTop ? cl.visibleHeadTable : '')}>
                {head.map((it, index) => (
                    <th scope="col" key={index} >{it === undefined ? '' : it}</th>
                ))}
            </tr>
            <tr className={cls(cl.leftRoundedEl, !isVisibleHeadTop ? cl.visibleHeadTable : '')}/>
            {headTop && (
                <div className={cls(isVisibleHeadTop ? cl.visible : '', cl.headTop)}>
                    {headTop}
                </div>
            )}
        </thead>
    )
}
