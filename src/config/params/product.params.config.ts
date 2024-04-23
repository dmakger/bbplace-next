import { CORE_PARAMS } from "./core.params.config"

// ====={ PRODUCT PARAMS }=====
class ProductParams {
    private PRODUCT = 'p'
    private KEY = this.PRODUCT + CORE_PARAMS.KEY
    private VALUE = this.PRODUCT + CORE_PARAMS.VALUE
    
    // view
    private VERTICAL = 'v'
    private HORIZONTAL = 'h'
    private VIEW__VALUE = CORE_PARAMS.VIEW + this.VALUE

    VIEW__KEY = CORE_PARAMS.VIEW + this.KEY
    VERTICAL_VIEW__VALUE = this.VERTICAL + this.VIEW__VALUE
    HORIZONTAL_VIEW__VALUE = this.HORIZONTAL + this.VIEW__VALUE
    
    NUMBER_PAGE__KEY = CORE_PARAMS.NUMBER_PAGE + this.KEY

    getView = (view?: string | null) => {
        if (view === this.HORIZONTAL_VIEW__VALUE)
            return this.HORIZONTAL_VIEW__VALUE
        return this.VERTICAL_VIEW__VALUE
    }

    // SORT
    SORT = CORE_PARAMS.SORT + this.KEY
}
export const PRODUCT_PARAMS = new ProductParams()
