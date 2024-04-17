import { IArgsRequest } from "@/api/model/request.model.api"
import { SUPPLIER_ARGS_REQUEST } from "../data/supplier.data"

export const getArgsSupplier = (args?: IArgsRequest) => {
    return args ?? SUPPLIER_ARGS_REQUEST
}