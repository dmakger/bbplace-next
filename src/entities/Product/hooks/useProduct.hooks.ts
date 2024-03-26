import useAPI from "@/api/useApi";
import { productAPI } from "../api/product.api";
import { IArgsRequest } from "@/api/model/request.model.api";
import { IProductAPI } from "../model/product.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";

export function useProductAll(args: IArgsRequest) {
	return useAPI<IProductAPI[]>(['productList', args.filter ? args.filter : ''], () => productAPI.all(args))
}


export function useCategoryForFilter() {
	return useAPI<ICategory[]>([], () => productAPI.categoriesForFilter())
}
