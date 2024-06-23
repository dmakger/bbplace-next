"use client"

import { FC, useEffect, useState } from "react"

import cl from './_Table.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { IRow, ITable } from "../model/table.model";
import { THead } from "../componets/Head/THead";
import { TBody } from "../componets/Body/TBody";
import { TableVariant } from "../data/table.data";
import { isEqual } from "lodash";
import { unionDataTable, unionHeadTable } from "../lib/table.lib";
import { WrapperForUnions } from "../componets/WrapperForUnions/WrapperForUnions";

interface TableProps extends ITable {
    className?: string,
}

export const Table:FC<TableProps> = ({head, data, unions, wrapperForUnions=WrapperForUnions, variant=TableVariant.WHITE, className}) => {
    // STATE
    const [currentHead, setCurrentHead] = useState<ITable['head']>([])
    const [currentData, setCurrentData] = useState<ITable['data']>([])

    // EFFECT
    useEffect(() => {
        setCurrentHead(prevHead => (
            isEqual(head, prevHead) ? prevHead : head
        ))
        setCurrentData(prevData => (
            isEqual(data, prevData) ? prevData : data
        ))
    }, [head, data])

    useEffect(() => {
        setCurrentHead(prevHead => unionHeadTable(prevHead, unions))
        setCurrentData(prevData => unionDataTable(prevData, unions, wrapperForUnions))
    }, [unions])

    console.log('table qwe', currentData)

    return (
        <table className={cls(cl.table, cl[variant], className)}>
            <THead head={currentHead} variant={variant} />
            <TBody data={currentData} variant={variant} />
        </table>
    )
}
