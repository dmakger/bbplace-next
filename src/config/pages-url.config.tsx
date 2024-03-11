// ======={ MAIN }=======
class MAIN {
    private root = ''

    HOME = `${this.root}/`
    CATALOG = `${this.root}/catalog`
    PRODUCTS = `${this.root}/product`
    TENDERS = `${this.root}/tender`
    COMPANIES = `${this.root}/company`
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
}

export const DASHBOARD_PAGES = new DASHBOARD()