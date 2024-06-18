"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderTable.module.scss'
import { Table } from "@/shared/ui/Table/ui/Table";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { TENDER_ARGS_REQUEST } from "@/entities/Tender/data/tender.data";
import { ETenderType, ITender } from "@/entities/Tender/model/tender.model";
import { tenderAPIListToTenderList, tenderAPIToTender } from "@/entities/Tender/lib/process.tender.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { tenderToTableLK } from "@/features/Table/lib/lk.tender.table.lib";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { OptionT } from "@/shared/ui/Option/ui/this/OptionT";
import { OptionVariant } from "@/shared/data/option.data";
import { TableCellOption } from "@/shared/ui/Table/componets/Cell/Option/TableCellOption";
import { IRow } from "@/shared/ui/Table/model/table.model";
import TableCell from "@/shared/ui/Table/componets/Cell";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { LKTenderTableCellTrash } from "../components/Cell/Trash/LKTenderTableCellTrash";

interface LKTenderTableProps{
    className?: string,
}

export const LKTenderTable:FC<LKTenderTableProps> = ({className}) => {
    // STATE
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [tenders, setTenders] = useState<ITender[]>([])
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    
    // API
    const { data: tendersAPI, isLoading: isTendersLoading } = TenderAPI.useGetAllTendersQuery({limit: TENDER_ARGS_REQUEST.limit, page: pageNumber-1});
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()          
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const [ getCategory ] = CategoryAPI.useGetCategoryMutation();

    // EFFECT
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

    useEffect(() => {
        if (tendersAPI && metrics && currencyList && categoryList)
            setTenders(() => {
                return tendersAPI.map((it, index) => (
                    {...tenderAPIToTender({tenderAPI: it, metrics, currencyList}), category: categoryList[index]}
                ))
            })
    }, [tendersAPI, metrics, currencyList, categoryList])

    useEffect(() => {
        if (tenders.length === 0)
            return
        setRowsTable(() => (
            tenderToTableLK(tenders).map(it => {
                return [
                    <TableCell.Option text={it.name} />,
                    <TableCell.Text text={it.category ? it.category.name : ''} />,
                    <TableCell.Text text={`${it.files}`} />,
                    <LKTenderTableCellTrash tenderId={""} type={ETenderType.PURCHASE} />,
                ] as IRow
            })
        ))

    }, [tenders])

    // console.log('tenders', tenders, tenderToTableLK(tenders))
    console.log('tenders', categoryList, tenderToTableLK(tenders))

    return (
        <>
            <Table head={['Наименование', 'Категория', 'Файлы', '']} data={rowsTable} unions={[]} />
            <OptionT text="qwer qwer q wer qw er qwer" variant={OptionVariant.TO_GRAY} />
            <OptionT text="qwer qwer q wer qw er qwer" variant={OptionVariant.TO_BLUE} />
        </>
    )
}
