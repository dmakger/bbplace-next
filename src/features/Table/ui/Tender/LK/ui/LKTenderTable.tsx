"use client"

import { FC, useEffect, useState } from "react"

import cl from './_TenderTable.module.scss'
import { Table } from "@/shared/ui/Table/ui/Table";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { ETenderType, ETenderTypeEn, ITender } from "@/entities/Tender/model/tender.model";
import { tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import TableCell from "@/shared/ui/Table/components/Cell";
import { LKTenderTableCellTrash } from "../components/Cell/Trash/LKTenderTableCellTrash";
import { useAppSelector } from "@/storage/hooks";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { useParams } from "next/navigation";
import { toTenderType } from "@/entities/Tender/lib/tender.lib";
import { skipToken } from "@reduxjs/toolkit/query";
import { isEqual } from "lodash";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { WrapperDefaultTenderNotFound } from "@/shared/ui/Wrapper/Default/ui/Tender/NotFound/WrapperDefaultTenderNotFound";

interface LKTenderTableProps {
    tenderType?: ETenderTypeEn,
    defaultTenders?: ITender[]
    onClickDeleteTender?: (tender: ITender, type?: ETenderTypeEn) => void
    className?: string,
}

export const LKTenderTable: FC<LKTenderTableProps> = ({ tenderType, defaultTenders, onClickDeleteTender, ...rest }) => {
    //PARAMS
    const params = useParams()
    const tenderTypeSuccess = tenderType ? tenderType : toTenderType(params.type as string) as ETenderTypeEn

    // STATE
    const [tenders, setTenders] = useState<ITender[] | undefined>(undefined)
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    const [unionsColumn, setUnionsColumn] = useState<IUnionColumn[]>([])
    const [is1024, setIs1024] = useState<boolean>(false);

    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // API
    const { data: tendersAPI } = TenderAPI.useGetUserTendersQuery(userId && !defaultTenders ? { userId, type: tenderTypeSuccess } : skipToken);
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const [deleteTender] = TenderAPI.useDeleteTenderMutation()

    // HANDLE
    const onClickDelete = async (tender: ITender, type?: ETenderTypeEn) => {
        if (onClickDeleteTender) {
            onClickDeleteTender(tender, type)
            return
        }
        if (type === undefined || tenders === undefined) return
        // deleteTender()
        await deleteTender({tenderId: tender.id, type}).unwrap().then(
            () => {                
                setTenders(prevTenders => {
                    if (prevTenders !== undefined)
                        return prevTenders.filter(it => it.id !== tender.id)
                })
            }
        )
    }

    // ======={ EFFECT }=======

    // DET DEFAULT TENDERS
    useEffect(() => {
        if (!isEqual(defaultTenders, tenders)) {
            setTenders(defaultTenders)
        }
    }, [defaultTenders])
    
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
                return {
                    row: [
                        { cell: <TableCell.Option text={it.name} href={MAIN_PAGES.CURRENT_TENDER({id: it.id, type: it.type}).path}/> },
                        { cell: <TableCell.Text text={it.category ? it.category.name : ''} />, className: cl.cell },
                        { cell: <TableCell.Text text={`${it.attachments.length}`} />, className: cl.cell },
                        { cell: <LKTenderTableCellTrash onClick={() => onClickDelete(it, it.type)} />, className: cl.cell },
                    ]
                } as IRow
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
            <Table 
                head={['Наименование', 'Категория', 'Файлы', '']} data={rowsTable} unions={unionsColumn} 
                defaultBody={
                    <WrapperDefaultTenderNotFound />
                } showDefaultBody={!tenders || tenders.length === 0} 
                {...rest} />
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}