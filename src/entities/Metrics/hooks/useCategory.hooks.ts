import useAPI from "@/api/useApi";
import { categoryAPI } from "../api/category.metrics.api";
import { ICategory } from "../model/category.metrics.model";

export function useCategoryAll() {
	return useAPI<ICategory[]>(['categoryList'], () => categoryAPI.all())
}
