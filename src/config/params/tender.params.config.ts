import { CORE_PARAMS } from "./core.params.config"

// ====={ TENDER PARAMS }=====
class TenderParams {
    private TENDER = 't'
    private KEY = this.TENDER + CORE_PARAMS.KEY

    private VALUE = this.TENDER + CORE_PARAMS.VALUE
    
    NUMBER_PAGE__KEY = CORE_PARAMS.NUMBER_PAGE + this.KEY

    // SORT
    SORT = CORE_PARAMS.SORT + this.KEY
    
}
export const TENDER_PARAMS = new TenderParams()
