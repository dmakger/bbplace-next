"use client"

import { FC, useEffect, useState } from "react"

import cl from './_Table.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { ITable } from "../model/table.model";
import { TBody } from "../components/Body/TBody";
import { THead } from "../components/Head/ui/THead";
import { TableVariant } from "../data/table.data";
import { isEqual } from "lodash";
import { unionDataTable, unionHeadTable } from "../lib/table.lib";
import { WrapperForUnions } from "../components/WrapperForUnions/WrapperForUnions";

interface TableProps extends ITable {
    className?: string,
}

export const Table: FC<TableProps> = ({ head, data, unions, unionsRest, wrapperForUnions = WrapperForUnions, variant = TableVariant.WHITE, headTop, isVisibleHeadTop, className }) => {
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
        setCurrentData(prevData => unionDataTable(prevData, unions, unionsRest, wrapperForUnions))
    }, [unions])

    return (
        <table className={cls(cl.table, cl[variant], className)}>
            <THead head={currentHead} variant={variant} headTop={headTop} isVisibleHeadTop={isVisibleHeadTop}/>
            <TBody data={currentData} variant={variant} />
        </table>
    )
}
