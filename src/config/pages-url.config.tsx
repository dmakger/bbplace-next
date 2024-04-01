import { ISupplier } from "@/entities/Supplier/model/supplier.model"

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
}

export const MAIN_PAGES = new MAIN()


// ======={ DASHBOARD }=======
class DASHBOARD {
    private root = '/i'

    HOME = this.root
    PROFILE_EDIT = `${this.root}/edit`
    PRODUCTS = `${this.root}/product`
    FAVORITE = `${this.root}/favorite`
    CHATS = `${this.root}/chat`

    CURRENT_CHAT = (id: ISupplier['id']) => `${this.CHATS}/${id}`

}

export const DASHBOARD_PAGES = new DASHBOARD()