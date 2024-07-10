import { IProduct } from "./product.model";

export interface IGroupProducts {
    id: IProduct['id'],
    main: IProduct,
    rest: IProduct[]
}
