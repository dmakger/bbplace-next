"use client"

import { FC, useEffect, useState } from "react"

import cl from './_LKProductTable.module.scss'
import { ProductAPI } from "@/entities/Product/api/product.api";
import { IProduct } from "@/entities/Product/model/product.model";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IRow, IUnionColumn } from "@/shared/ui/Table/model/table.model";
import { Table } from "@/shared/ui/Table/ui/Table";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import TableCell from "@/shared/ui/Table/components/Cell";
import { LKProductTableCellProduct } from "../components/Cell/Product/LKProductTableCellProduct";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { THeadTop } from "@/shared/ui/Table/components/Head/components/HeadTop/THeadTop";
import { LKProductTableCellCheckbox } from "../components/Cell/Checkbox/LKProductTableCellCheckbox";
import { LKTenderTableCellEditDelete } from "../components/Cell/EditDelete/LKTenderTableCellEditDelete";
import { useAppSelector } from "@/storage/hooks";

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
    const [is768, setIs768] = useState<boolean>(false);

    // RTK
    const { id: userId } = useAppSelector(state => state.user)
    console.log('userId qwe', userId)

    // API
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const [deleteProduct] = ProductAPI.useDeleteProductMutation();
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
                    { cell: <LKProductTableCellCheckbox product={it} checked={selectedProducts.some(sp => sp.id === it.id)} onClick={onClickCheckbox} />, className: cl.p15 },
                    { cell: <LKProductTableCellProduct product={it} /> },
                    { cell: <TableCell.Text text={it.media.color} />, className: cl.p20 },
                    { cell: <TableCell.Text text={it.media.article} />, className: cl.p20 },
                    { cell: <LKTenderTableCellEditDelete onClickDelete={() => onClickDelete([it])} onClickEdit={() => onClickEdit(it)} />, className: cl.p20 },
                ] as IRow
            })
        ))

    }, [selectedProducts, products])

    // useEffect(() => {
    //     const selectedProductsIds = new Set(selectedProducts.map(it => it.id))
    //     setRowsTable(prevRowsTable => {
    //         return prevRowsTable.map(it => {
    //             it.cell
    //         })
    //     })
    // }, [selectedProducts, rowsTable])

    // SET UNIONS
    useEffect(() => {
        // setUnionsColumn(() => is1024 ? [{ start: 1, end: 3 }] : [])
        setUnionsColumn(() => is768 ? [{ start: 2, end: 4 }] : [])
    }, [is768])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIs768(window.innerWidth <= 768);
        }
    }, []);


    // ======={ HANDLES }=======
    // CHECKBOX ON CLICK
    const onClickCheckbox = (product: IProduct, isChecked: boolean) => {
        setSelectedProducts(prevSelectedProducts => {
            const prevSelectedProductIds = prevSelectedProducts.map(it => it.id)
            if (isChecked)
                return prevSelectedProductIds.includes(product.id) ? prevSelectedProducts : [...prevSelectedProducts, product]
            return prevSelectedProducts.filter(it => it.id !== product.id)
        })
    }

    // CANCEL ON CLICK
    const onClickCancel = () => {
        setSelectedProducts([])
    }

    // DELETE ON CLICK
    const onClickDelete = (_productList?: IProduct[]) => {
        const _products = _productList === undefined ? [...selectedProducts] : _productList
                
        const productsIds = new Set(_products.map(it => it.id))
        setProducts(prevProducts => {
            return prevProducts.filter(it => !productsIds.has(it.id))
        })
        setSelectedProducts(prevSelectedProducts => {
            return prevSelectedProducts.filter(it => !productsIds.has(it.id))
        })

        const errorsProduct: IProduct[] = []
        _products.map(async it => {
            // await deleteProduct(it.id).unwrap().catch(() => {
            //     errorsProduct.push(it)
            // })
        })
    }

    // EDIT ON CLICK
    const onClickEdit = (_product: IProduct) => { }

    return (
        <>
            {rowsTable.length > 0 &&
                <Table head={['', 'Категория, Наименование', 'Тип', 'Артикул', '']} 
                        data={rowsTable} 
                        unions={unionsColumn} 
                        isVisibleHeadTop={selectedProducts.length > 0}
                        headTop={
                            <THeadTop amount={selectedProducts.length} 
                                      onClickCancel={onClickCancel} onClickDelete={() => onClickDelete()} />
                        }
                        {...rest} />
            }
            <HandleSize width={768} set={setIs768} />
        </>
    )
}
