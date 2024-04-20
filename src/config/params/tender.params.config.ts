import { CORE_PARAMS } from "./core.params.config"

// ====={ TENDER PARAMS }=====
class TenderParams {
    private TENDER = 't'
    private KEY = this.TENDER + CORE_PARAMS.KEY
    
    NUMBER_PAGE__KEY = CORE_PARAMS.NUMBER_PAGE + this.KEY
}
export const TENDER_PARAMS = new TenderParams()
