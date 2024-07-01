"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTable.module.scss'
import { ProductAPI } from "@/entities/Product/api/product.api";
import { IProduct } from "@/entities/Product/model/product.model";
import { productApiListToProductList, productApiToProduct } from "@/entities/Product/lib/product.lib";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import { Table } from "@/shared/ui/Table/ui/Table";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import TableCell from "@/shared/ui/Table/components/Cell";
import { LKProductTableCellMax } from "../components/Cell/Product/Max/LKProductTableCellMax";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { THeadTop } from "@/shared/ui/Table/components/Head/components/HeadTop/THeadTop";
import { LKProductTableCellCheckbox } from "../components/Cell/Checkbox/LKProductTableCellCheckbox";

interface LKProductTableProps{
    className?: string,
}

export const LKProductTable:FC<LKProductTableProps> = ({...rest}) => {
    // STATE
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [products, setProducts] = useState<IProduct[]>([]);
    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    const [unionsColumn, setUnionsColumn] = useState<IUnionColumn[]>([])
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [is1024, setIs1024] = useState<boolean>(false);

    // API
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        { limit: 16, page: 0 },
        { refetchOnMountOrArgChange: true }
    );


    // ======={ EFFECT }=======
    
    // SET CATEGORIES
    useEffect(() => {
        if (!productsAPI) return;

        const fetchCategories = async () => {
            try {
                const categories = await Promise.all(
                    productsAPI.map(async (it) => {
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
    }, [productsAPI, getCategory]);

    // SET PRODUCTS
    useEffect(() => {
        if (productsAPI && categoryList) {
            setProducts(() => {
                return productsAPI.map((it, index) => (
                    { ...productApiToProduct({ productAPI: it }), category: categoryList[index] }
                ))
            })
        }
    }, [productsAPI, categoryList])

    // SET ROWS TABLE
    useEffect(() => {
        if (products === undefined)
            return
        setRowsTable(() => (
            products.map(it => {
                return [
                    { cell: <LKProductTableCellCheckbox product={it} onClick={onClickCheckbox} />, className: cl.cell },
                    { cell: <LKProductTableCellMax product={it} /> },
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

    // HANDLES
    const onClickCheckbox = (product: IProduct, isChecked: boolean) => {
        setSelectedProducts(prevSelectedProducts => {
            const prevSelectedProductIds = prevSelectedProducts.map(it => it.id)
            if (isChecked)
                return prevSelectedProductIds.includes(product.id) ? prevSelectedProducts : [...prevSelectedProducts, product]
            return prevSelectedProducts.filter(it => it.id !== product.id)
        })
    }

    const onClickCancel = () => {
        setSelectedProducts([])
    }

    const onClickDelete = () => {
        // setSelectedProducts([])
    }

    return (
        <>
            {rowsTable.length > 0 &&
                <Table head={['', 'Категория, Наименование', 'Тип', 'Артикул', '']} 
                        data={rowsTable} 
                        unions={unionsColumn} 
                        isVisibleHeadTop={selectedProducts.length > 0}
                        headTop={
                            <THeadTop amount={selectedProducts.length} onClickCancel={onClickCancel} onClickDelete={onClickDelete} />
                        }
                        {...rest} />
            }
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}
