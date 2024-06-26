'use client'

import cl from './_SupplierList.module.scss'
import { WrapperPagination } from "@/shared/ui/Wrapper/Pagination/ui/WrapperPagination"
import { SupplierAPI } from "../../api/supplier.api"
import { SUPPLIER_ARGS_REQUEST } from "../../data/supplier.data"
import { useEffect, useState } from "react"
import { ISupplier } from "../../model/supplier.model"
import { supplierApiListToSupplierList } from "../../lib/process.supplier.lib"
import { SupplierItem } from "../Item/SupplierItem"
import { useDispatch } from "react-redux"
import { EPTC } from "@/widgets/NavBarPTC/model/ptc.model"
import { PTCSlice } from "@/features/storage/PTC/ptc.storage"
import { WrapperSortFilter } from "@/shared/ui/Wrapper/SortFilter/ui/WrapperSortFilter"
import { ECatalogVariants } from "@/widgets/SortFilterSidebar"
import { useSearchParams } from "next/navigation"
import { paramsToBack } from "@/config/params/backend.params.config"
import { SUPPLIER_PARAMS } from "@/config/params/supplier.params.config"
import { SuspenseL } from '@/shared/ui/Wrapper/SuspenseL/SuspenseL'

export const SupplierList = () => {
    return (
        <SuspenseL>
            <SupplierListChild />
        </SuspenseL>
    )
}


export const SupplierListChild = () => {
    // ROUTER
    const searchParams = useSearchParams();
    const newParams = paramsToBack(searchParams)

    // STATE
    const [supplierList, setSupplierList] = useState<ISupplier[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)

    //API
    const { data: suppliersApi, isLoading: isSupplierLoading } = SupplierAPI.useGetSuppliersQuery({ limit: SUPPLIER_ARGS_REQUEST.limit, page: pageNumber - 1, params: newParams }, { refetchOnMountOrArgChange: true })
    const { data: countSuppliers, isLoading: isCountSuppliersLoading } = SupplierAPI.useGetCountSuppliersQuery({ limit: SUPPLIER_ARGS_REQUEST.limit, params: newParams }, { refetchOnMountOrArgChange: true })
    const { data: countAllSuppliers, isLoading: isCountAllSuppliersLoading } = SupplierAPI.useGetCountSuppliersQuery({ limit: 1, params: newParams }, { refetchOnMountOrArgChange: true })

    // RTK
    const dispatch = useDispatch();

    // EFFECT
    useEffect(() => {
        if (suppliersApi)
            setSupplierList(supplierApiListToSupplierList(suppliersApi))
    }, [suppliersApi])

    useEffect(() => {
        if (!isCountAllSuppliersLoading && suppliersApi !== undefined && countAllSuppliers) {
            dispatch(PTCSlice.actions.setPTC({
                amount: countAllSuppliers,
                view: EPTC.SUPPLIER,
            }), { refetchOnMountOrArgChange: true });
        }

    }, [dispatch, isCountAllSuppliersLoading, suppliersApi, countAllSuppliers])


    if (isSupplierLoading && isCountSuppliersLoading)
        return <div>Loading...</div>

    return (
        <WrapperSortFilter variant={ECatalogVariants.COMPANIES} pageNumberKey={SUPPLIER_PARAMS.NUMBER_PAGE__KEY}>
            <WrapperPagination amount={countSuppliers ? countSuppliers : 1}
                active={pageNumber}
                set={setPageNumber} keyPageParam={SUPPLIER_PARAMS.NUMBER_PAGE__KEY}>
                {supplierList.map(it => (
                    <SupplierItem supplier={it} key={it.id}/>
                ))}
            </WrapperPagination>
        </WrapperSortFilter>
    )
}
