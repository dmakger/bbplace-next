export enum ESupplierRole {
    BUYER = "buyer",
    SELLER = "seller",
}


export const PREFIX_SUPPLIER_VIEW = "supplier"

export enum ESupplierView {
    NONE = `none__${PREFIX_SUPPLIER_VIEW}`,
    SMALL = `small__${PREFIX_SUPPLIER_VIEW}`,
    LARGE_GRAY = `largeGray__${PREFIX_SUPPLIER_VIEW}`,
    LARGE_WHITE = `largeWhite__${PREFIX_SUPPLIER_VIEW}`,
}

export enum ESupplierAxis {
    HORIZONTAL = `horizontal__${PREFIX_SUPPLIER_VIEW}`,
    VERTICAL = `vertical__${PREFIX_SUPPLIER_VIEW}`,
}
