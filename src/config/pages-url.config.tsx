import { EProductType } from "@/entities/Product/data/type.product.data"
import { toProductType } from "@/entities/Product/lib/type.product.lib"
import { IProduct } from "@/entities/Product/model/product.model"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"
import { ETenderType, ETenderTypeEn, IBaseTender, ITender } from "@/entities/Tender/model/tender.model"
import { getCurrentLKToken } from "@/entities/User/lib/user-token.lib"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data"

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
    // CATALOG = this.createPath('/catalog');
    PRODUCTS = this.createPath('/products');
    
    TENDERS = this.createPath('/tenders');
    BUYERS_TENDERS = this.createPath('/tenders?application=Покупка&nptk=1', true);

    SUPPLIERS = this.createPath('/suppliers');

    SUPPORT = this.createPath('/supports');

    TARIFFS = this.createPath('/tariffs');

    PAYMENT = this.createPath('/payment');

    CHECK_EMAIL = this.createPath('/checkEmail')
    LOGIN = this.createPath('/signIn', false, true)
    REGISTRATION = this.createPath('/signUp')
    FORGOT_PASSWORD = this.createPath('/forgotPassword', false, true)

    CURRENT_SUPPLIER = this.createDynamicPath((id: ISupplier['id']) => `/suppliers/${id}`, true);
    CURRENT_PRODUCT = this.createDynamicPath((id: IProduct['id']) => `/products/${id}`, true);
    PRODUCTS_BY_CATEGORY = this.createDynamicPath((id: IProduct['id']) => `/products?category=${id}`, true);
    CURRENT_TENDER = this.createDynamicPath<{ id: ITender['id'], type?: IBaseTender['type'] }>(
        (params) => `/tenders/${params.id}/${params.type || ETenderType.PURCHASE}`,
        true
    );
    CURRENT_DOCUMENT = this.createDynamicPath((documentName: string) => `/documents/${documentName}`)

    ONLY_FOR_SELLERS = this.createPath('/onlyForSellers')

}

export const MAIN_PAGES = new MAIN('')


class DASHBOARD extends Route {
    constructor() {
        super('/i');
    }
    
    _HOME__SELLER = this.createPath('/products', true)
    _HOME__BUYER = this.createPath('/chat', true)

    // HOME = this.createPath('/chat', true); // Дефолтное значение, которое будет использовать сервер
    HOME = getCurrentLKToken() === ECurrentLK.SELLER 
            ? this._HOME__SELLER.path 
            : this._HOME__BUYER.path

    PROFILE_EDIT = this.createPath('/edit', true);
    FAVOURITES = this.createPath('/favourites', true);
    
    CHATS = this.createDynamicPath((id?: ISupplier['id'] | number ) => (
        `/chat` + ( id ? `?id=${id}` : '')
    ), true);
    PRODUCTS = this.createDynamicPath(
        (isDraft:boolean = false) => `/products?type=${isDraft ? ProductsTypeLK.Draft : ProductsTypeLK.Active}`
        , true
    );
    NEW_PRODUCT = this.createPath('/products/new', true);
    EDIT_PRODUCT = this.createDynamicPath<{ groupId: number, type?: string | EProductType, id?: IProduct['id'] }>(
        ({type, groupId, id}) => {
            const startURL = `/products/edit?type=${toProductType(type)}&groupId=${groupId}`
            return id !== undefined ? `${startURL}&id=${id}`: startURL
        },
        true
    );

    TENDERS = this.createDynamicPath(
        (isPurchase:boolean = false) => `/tenders?type=${(isPurchase ? ETenderTypeEn.PURCHASE : ETenderTypeEn.SALE).toLocaleLowerCase()}`
        , true
    );
    // TENDERS = this.createPath('/tenders', true);
    NEW_TENDER = this.createPath('/tenders/new', true);
    
    PRICES_N_DISCOUNTS = this.createPath('/pricesNDiscounts', true);
    REVIEWS = this.createPath('/reviews', true);
}

export const DASHBOARD_PAGES = new DASHBOARD();


// ==={ ПРИМЕНЕНИЕ }===
// DASHBOARD_PAGES.PRODUCTS
// MAIN_PAGES.CURRENT_TENDER({id: 123})
// MAIN_PAGES.CURRENT_TENDER({id: 123, type: ETenderType.SALE})