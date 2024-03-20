import useAPI from "@/api/useApi";
import { productAPI } from "../api/product.api";
import { IArgsRequest } from "@/api/model/request.model.api";
import { IProductAPI } from "../model/product.model";

export function useProductAll(args: IArgsRequest) {
	return useAPI<IProductAPI[]>(['productList', args.filter ? args.filter : ''], () => productAPI.all(args))
}
