"use client"

import { FC, useEffect, useState } from "react"

import cl from './_TenderTable.module.scss'
import { Table } from "@/shared/ui/Table/ui/Table";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { ETenderType, ITender } from "@/entities/Tender/model/tender.model";
import { tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import TableCell from "@/shared/ui/Table/componets/Cell";
import { LKTenderTableCellTrash } from "../components/Cell/Trash/LKTenderTableCellTrash";
import { useAppSelector } from "@/storage/hooks";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { useParams } from "next/navigation";
import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { skipToken } from "@reduxjs/toolkit/query";

interface LKTenderTableProps {
    tenderType?: ETenderType
    className?: string,
}

export const LKTenderTable: FC<LKTenderTableProps> = ({ tenderType, ...rest }) => {
    //PARAMS
    const params = useParams()
    const tenderTypeSuccess = tenderType ? tenderType : toTenderType(params.type as string) as ETenderType

    // STATE
    const [tenders, setTenders] = useState<ITender[] | undefined>(undefined)
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    const [unionsColumn, setUnionsColumn] = useState<IUnionColumn[]>([])
    const [is1024, setIs1024] = useState<boolean>(false);

    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // API
    const { data: tendersAPI, isLoading: isTendersLoading } = TenderAPI.useGetUserTendersQuery(userId ? { userId, type: tenderTypeSuccess } : skipToken);
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const [deleteTender] = TenderAPI.useDeleteTenderMutation()

    // HANDLE
    const onClickDelete = async (tenderId: ITender['id'], type?: ETenderType) => {
        if (type === undefined || tenders === undefined) return
        // deleteTender()
        await deleteTender({tenderId, type}).unwrap().then(
            () => {                
                setTenders(prevTenders => {
                    if (prevTenders === undefined) return

                    return prevTenders.filter(it => it.id !== tenderId)
                })
            }
        )
    }

    // ======={ EFFECT }=======
    
    // SET CATEGORIES
    useEffect(() => {
        if (!tendersAPI) return;

        const fetchCategories = async () => {
            try {
                const categories = await Promise.all(
                    tendersAPI.map(async (it) => {
                        const categoryResponse = await getCategory(it.categoryId).unwrap();
                        return categoryResponse[0]; // Assuming the response is an array and we need the first element
                    })
                );
                setCategoryList(categories);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, [tendersAPI, getCategory]);

    // SET TENDERS
    useEffect(() => {
        if (tendersAPI && metrics && currencyList && categoryList) {
            setTenders(() => {
                return tendersAPI.map((it, index) => (
                    { ...tenderAPIToTender({ tenderAPI: it, metrics, currencyList }), category: categoryList[index] }
                ))
            })
        }
    }, [tendersAPI, metrics, currencyList, categoryList])

    // SET ROWS TABLE
    useEffect(() => {
        if (tenders === undefined)
            return
        setRowsTable(() => (
            tenders.map(it => {
                return [
                    { cell: <TableCell.Option text={it.name} /> },
                    { cell: <TableCell.Text text={it.category ? it.category.name : ''} />, className: cl.cell },
                    { cell: <TableCell.Text text={`${it.attachments.length}`} />, className: cl.cell },
                    { cell: <LKTenderTableCellTrash onClick={() => onClickDelete(it.id, it.type)} />, className: cl.cell },
                ] as IRow
            })
        ))

    }, [tenders])


    // SET UNIONS
    useEffect(() => {
        setUnionsColumn(() => is1024 ? [{ start: 1, end: 3 }] : [])
    }, [is1024])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIs1024(window.innerWidth <= 1024);
        }
    }, []);

    return (
        <>
            {rowsTable.length > 0 &&
                <Table head={['Наименование', 'Категория', 'Файлы', '']} data={rowsTable} unions={unionsColumn} {...rest} />
            }
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}