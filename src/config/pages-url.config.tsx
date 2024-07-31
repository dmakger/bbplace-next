import { IProduct } from "@/entities/Product/model/product.model"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { ETenderType, IBaseTender, ITender } from "@/entities/Tender/model/tender.model"

interface IRoot {
    path: string
    onlyAuth: boolean,
    onlyHasEmail: boolean,

    toString: () => string
}


class Route {
    private readonly root: string;

    constructor(root: string) {
        this.root = root
    }

    createPath(subPath: string, onlyAuth: boolean = false, onlyHasEmail: boolean = false): IRoot {
        const path = `${this.root}${subPath}`
        return {
            path,
            onlyAuth,
            onlyHasEmail,
            toString: () => path,
        }
    }

    createDynamicPath<T>(subPath: (params: T) => string, onlyAuth: boolean = false, onlyHasEmail: boolean = false): (params: T) => IRoot {
        return (params: T) => (
            this.createPath(subPath(params), onlyAuth, onlyHasEmail)
        );
    }
}


// ======={ MAIN }=======
class MAIN extends Route {
    HOME = this.createPath('/');
    CATALOG = this.createPath('/catalog');
    PRODUCTS = this.createPath('/product');
    TENDERS = this.createPath('/tender');
    SUPPLIERS = this.createPath('/supplier');

    SUPPORT = this.createPath('/support');

    CHECK_EMAIL = this.createPath('/checkEmail')
    LOGIN = this.createPath('/signIn', false, true)
    REGISTRATION = this.createPath('/signUp')
    FORGOT_PASSWORD = this.createPath('/forgotPassword', false, true)

    CURRENT_SUPPLIER = this.createDynamicPath((id: ISupplier['id']) => `/supplier/${id}`, true);
    CURRENT_PRODUCT = this.createDynamicPath((id: IProduct['id']) => `/product/${id}`, true);
    CURRENT_TENDER = this.createDynamicPath<{ id: ITender['id'], type?: IBaseTender['type'] }>(
        (params) => `/tender/${params.id}/${params.type || ETenderType.PURCHASE}`,
        true
    );

    CURRENT_DOCUMENT = this.createDynamicPath((documentName: string) => `/documents/${documentName}`)

}

export const MAIN_PAGES = new MAIN('')


class DASHBOARD extends Route {
    HOME = this.createPath('/', true);
    PROFILE_EDIT = this.createPath('/edit', true);
    FAVORITE = this.createPath('/favorite', true);
    CHATS = this.createPath('/chat', true);

    PRODUCTS = this.createPath('/product', true);
    TENDERS = this.createPath('/tender', true);
    PRICES_N_DISCOUNTS = this.createPath('/pricesNDiscounts', true);
    REVIEWS = this.createPath('/reviews', true);
    
    NEW_TENDER = this.createPath('/tender/new', true);
    NEW_PRODUCT = this.createPath('/product/new', true);

    CURRENT_CHAT = this.createDynamicPath((id: ISupplier['id']) => `/chat/${id}`, true);
    EDIT_PRODUCT = this.createDynamicPath((id: IProduct['id']) => `/product/edit/${id}`, true);
}

export const DASHBOARD_PAGES = new DASHBOARD('/i');


// ==={ ПРИМЕНЕНИЕ }===
// DASHBOARD_PAGES.PRODUCTS
// MAIN_PAGES.CURRENT_TENDER({id: 123})
// MAIN_PAGES.CURRENT_TENDER({id: 123, type: ETenderType.SALE})