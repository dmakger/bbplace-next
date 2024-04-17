'use client'

import { WrapperPagination } from "@/shared/ui/Wrapper/Pagination/ui/WrapperPagination"
import { SupplierAPI } from "../../api/supplier.api"
import { SUPPLIER_ARGS_REQUEST } from "../../data/supplier.data"
import { useEffect, useState } from "react"
import { ISupplier } from "../../model/supplier.model"
import { supplierApiListToSupplierList } from "../../lib/process.supplier.lib"
import { SupplierItem } from "../Item/SupplierItem"



export const SupplierList = () => {
    // STATE
    const [supplierList, setSupplierList] = useState<ISupplier[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)  


    //API
    const {data: suppliersApi, isLoading: isSupplierLoading} = SupplierAPI.useGetSuppliersQuery({limit: SUPPLIER_ARGS_REQUEST.limit, page: pageNumber-1}, {refetchOnMountOrArgChange: true})
    const {data: countSuppliers, isLoading: isCountSuppliersLoading} = SupplierAPI.useGetCountSuppliersQuery({limit: SUPPLIER_ARGS_REQUEST.limit}, {refetchOnMountOrArgChange: true})

    
    useEffect(() => {
        if(suppliersApi)
        setSupplierList(supplierApiListToSupplierList(suppliersApi))
    }, [suppliersApi])

    if (isSupplierLoading && isCountSuppliersLoading)
        return <div>Loading...</div>

  return (
      <WrapperPagination amount={countSuppliers ? countSuppliers : 1}
          active={pageNumber}
          set={setPageNumber} keyPageParam={""}>
          {supplierList.map(it => (
            <SupplierItem supplier={it}/>
          ))}
      </WrapperPagination>
  )
}
