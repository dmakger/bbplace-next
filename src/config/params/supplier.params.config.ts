import { CORE_PARAMS } from "./core.params.config"

// ====={ SUPPLIER PARAMS }=====
class SupplierParams {
    private SUPPLIER = 's'
    private KEY = this.SUPPLIER + CORE_PARAMS.KEY

    private VALUE = this.SUPPLIER + CORE_PARAMS.VALUE
    
    NUMBER_PAGE__KEY = CORE_PARAMS.NUMBER_PAGE + this.KEY

    // SORT
    SORT = CORE_PARAMS.SORT + this.KEY
    
}
export const SUPPLIER_PARAMS = new SupplierParams()
