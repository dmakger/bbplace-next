import useAPI from "@/api/useApi";
import { productAPI } from "../api/product.api";
import { IArgsRequest } from "@/api/model/request.model.api";

export function useProductAll(args: IArgsRequest) {
	return useAPI<any[]>(['productList'], () => productAPI.all(args))
}
