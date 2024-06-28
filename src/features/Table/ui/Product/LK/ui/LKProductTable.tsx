"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTable.module.scss'
import { ProductAPI } from "@/entities/Product/api/product.api";
import { IProduct } from "@/entities/Product/model/product.model";
import { productApiListToProductList } from "@/entities/Product/lib/product.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import { Table } from "@/shared/ui/Table/ui/Table";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import TableCell from "@/shared/ui/Table/componets/Cell";

interface LKProductTableProps{
    className?: string,
}

export const LKProductTable:FC<LKProductTableProps> = ({...rest}) => {
    // STATE
    const [products, setProducts] = useState<IProduct[]>([]);
    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    const [unionsColumn, setUnionsColumn] = useState<IUnionColumn[]>([])
    const [is1024, setIs1024] = useState<boolean>(false);

    // API
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        { limit: 16, page: 0 },
        { refetchOnMountOrArgChange: true }
    );

    // EFFECT
    useEffect(() => {
        if (productsAPI) setProducts(productApiListToProductList(productsAPI));
    }, [productsAPI]);

    // SET ROWS TABLE
    useEffect(() => {
        if (products === undefined)
            return
        setRowsTable(() => (
            products.map(it => {
                return [
                    { cell: <TableCell.Option text={''} /> },
                    { cell: <TableCell.Option text={it.name ? it.name : ''} /> },
                    { cell: <TableCell.Text text={it.media.color} />, className: cl.cell },
                    { cell: <TableCell.Text text={it.media.article} />, className: cl.cell },
                    { cell: <TableCell.Text text={''} />, className: cl.cell },
                    // { cell: <LKTenderTableCellTrash onClick={() => onClickDelete(it.id, it.type)} />, className: cl.cell },
                ] as IRow
            })
        ))

    }, [products])

    // SET UNIONS
    useEffect(() => {
        setUnionsColumn(() => is1024 ? [{ start: 1, end: 3 }] : [])
    }, [is1024])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIs1024(window.innerWidth <= 1024);
        }
    }, []);

    console.log('product 123', products)

    return (
        <>
            {rowsTable.length > 0 &&
                <Table head={['', 'Категория, Наименование', 'Тип', 'Артикул', '']} data={rowsTable} unions={unionsColumn} {...rest} />
            }
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}
