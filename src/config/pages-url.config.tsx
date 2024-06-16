import { IProduct } from "@/entities/Product/model/product.model"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { ETenderType, IBaseTender, ITender } from "@/entities/Tender/model/tender.model"

// ======={ MAIN }=======
class MAIN {
    private root = ''

    HOME = `${this.root}/`
    CATALOG = `${this.root}/catalog`
    PRODUCTS = `${this.root}/product`
    TENDERS = `${this.root}/tender`
    SUPPLIERS = `${this.root}/supplier`

    SUPPORT = `${this.root}/support`

    CURRENT_SUPPLIER = (id: ISupplier['id']) => `${this.SUPPLIERS}/${id}`
    CURRENT_PRODUCT = (id: IProduct['id']) => `${this.PRODUCTS}/${id}`
    CURRENT_TENDER = (id: ITender['id'], type: IBaseTender['type'] = ETenderType.PURCHASE) => `${this.TENDERS}/${id}/${type}`

}

export const MAIN_PAGES = new MAIN()


// ======={ DASHBOARD }=======
class DASHBOARD {
    private root = '/i'

    HOME = this.root
    PROFILE_EDIT = `${this.root}/edit`
    FAVORITE = `${this.root}/favorite`
    CHATS = `${this.root}/chat`

    PRODUCTS = `${this.root}/product`
    TENDERS = `${this.root}/tender`

    CURRENT_CHAT = (id: ISupplier['id']) => `${this.CHATS}/${id}`

}

export const DASHBOARD_PAGES = new DASHBOARD()