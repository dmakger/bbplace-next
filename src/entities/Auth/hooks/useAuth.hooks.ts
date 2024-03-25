import useAPI from "@/api/useApi";
import { ISupplier, ISupplierAPI } from "@/entities/Supplier/model/supplier.model";
import { authAPI } from "../api/auth.api";

export function useAuthUserData(userId: ISupplier['id']) {
	return useAPI<ISupplierAPI>(['supplier'], () => authAPI.getUserInfo(userId))
}
