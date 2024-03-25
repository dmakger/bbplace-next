import { axiosClassic } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "../model/auth.model";
import { getTokens, removeFromStorage, saveTokensStorage } from "../lib/auth-token.lib";
import { ISupplier, ISupplierAPI } from "@/entities/Supplier/model/supplier.model";
import { getURL } from "next/dist/shared/lib/utils";

class AuthAPI {
    private BASE_URL = 'auth/api/Authenticate'

    async login(data: IAuthForm) {
        const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/login/`, data
		)

		if (response.data) 
            saveTokensStorage(response.data)

		return response
    }

    async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/refresh-token/`, getTokens()
		)

		if (response.data) 
            saveTokensStorage(response.data)

		return response
	}

    async logout() {
        removeFromStorage()
	}


	async getUserInfo(userId: ISupplier['id']) {
		const response = await axiosClassic.post<ISupplierAPI>(
			`${this.BASE_URL}/GetUserInfo?userId=${userId}`
		)
		return response.data
	}
}


export const authAPI = new AuthAPI()
