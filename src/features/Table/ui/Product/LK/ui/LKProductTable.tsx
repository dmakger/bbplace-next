"use client"

import { FC, useEffect, useMemo, useState } from "react"

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
import { createGroupProducts } from "@/entities/Product/lib/group.product.lib";
import { IGroupProducts } from "@/entities/Product/model/group.product.model";
import { LKProductTableCellToggleWCheckbox } from "../components/Cell/ToggleWCheckbox/LKProductTableCellToggleWCheckbox";
import { cls } from "@/shared/lib/classes.lib";
import { skipToken } from "@reduxjs/toolkit/query";

interface LKProductTableProps {
    _products?: IProduct[]
    className?: string,
}

export const LKProductTable:FC<LKProductTableProps> = ({_products, ...rest}) => {
    // STATE
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [products, setProducts] = useState<IProduct[]>([]);
    const [groupsProducts, setGroupsProducts] = useState<IGroupProducts[]>([]);

    const [rowsTable, setRowsTable] = useState<IRow[]>([])
    const [showRestProducts, setShowRestProducts] = useState<boolean[]>([])
    const [unionsColumn, setUnionsColumn] = useState<IUnionColumn[]>([])
    const [unionsRestColumn, setUnionsRestColumn] = useState<IUnionColumn[]>([])
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [is1024, setIs1024] = useState<boolean>(false);

    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    // API
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const [deleteProduct] = ProductAPI.useDeleteProductMutation();
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        _products === undefined ? { limit: 24, page: 11 } : skipToken, 
        { refetchOnMountOrArgChange: true }
    );

    // ======={ EFFECT }=======
    
    // SET CATEGORIES
    useEffect(() => {
        if (!productsAPI || _products !== undefined) return;

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
    }, [_products, productsAPI, getCategory]);

    // SET PRODUCTS
    useEffect(() => {
        if (productsAPI && categoryList && _products === undefined) {
            setProducts(() => {
                return productsAPI.map((it, index) => (
                    { ...productApiToProduct({ productAPI: it }), category: categoryList[index] }
                ))
            })
        }
    }, [productsAPI, categoryList])

    useEffect(() => {
        if (_products !== undefined)
            setProducts(_products)
    }, [_products])

    useEffect(() => {
        if (!products) return;
        setGroupsProducts(createGroupProducts(products))
        setShowRestProducts(products.map(() => false));
    }, [products])
    
    // SET ROWS TABLE
    useEffect(() => {
        if (groupsProducts === undefined)
            return
        setRowsTable(() => (
            groupsProducts.map((it, index) => {
                return {
                    row: [
                        { cell: <LKProductTableCellToggleWCheckbox groupProducts={it} 
                                    checked={selectedProducts.some(sp => sp.id === it.main.id)} isShow={showRestProducts[index]} 
                                    onClickCheckbox={onClickCheckbox} onClickToggle={() => onClickShowRestProducts(index)} />, 
                          className: cls(cl.p0, cl.top) 
                        },
                        { cell: <LKProductTableCellProduct product={it.main} /> },
                        { cell: <TableCell.Text text={it.main.media.color} />, className: cl.p20 },
                        { cell: <TableCell.Text text={it.main.media.article} />, className: cl.p20 },
                        { cell: <LKTenderTableCellEditDelete onClickDelete={() => onClickDelete([it.main])} onClickEdit={() => onClickEdit(it.main)} />, className: cl.p20 },
                    ],
                    rest: it.rest.map(restItem => {
                        return [
                            { cell: <LKProductTableCellProduct product={restItem} isMin={true} showCategory={false} /> },
                            { cell: <TableCell.Text text={restItem.media.color} />, className: cl.p20 },
                            { cell: <TableCell.Text text={restItem.media.article} />, className: cl.p20 },
                            { cell: <LKTenderTableCellEditDelete isRow={true} onClickDelete={() => onClickDelete([restItem])} onClickEdit={() => onClickEdit(restItem)} />, className: cl.p20 },
                        ]
                    }),
                    isShowRest: showRestProducts[index],
                } as IRow
            })
        ))

    }, [showRestProducts, selectedProducts, groupsProducts])

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
        setUnionsColumn(() => is1024 ? [{ start: 2, end: 4 }] : [])
        setUnionsRestColumn(() => is1024 ? [{ start: 1, end: 3 }] : [])
    }, [is1024])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIs1024(window.innerWidth <= 768);
        }
    }, []);


    // ======={ HANDLES }=======
    const onClickShowRestProducts = (index: number) => {
        setShowRestProducts(prev => {
            const newPrev = [...prev]
            newPrev[index] = !newPrev[index]
            return newPrev
        })
    }

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
                        unions={unionsColumn} unionsRest={unionsRestColumn}
                        isVisibleHeadTop={selectedProducts.length > 0}
                        headTop={
                            <THeadTop amount={selectedProducts.length} 
                                      onClickCancel={onClickCancel} onClickDelete={() => onClickDelete()} />
                        }
                        {...rest} />
            }
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}
