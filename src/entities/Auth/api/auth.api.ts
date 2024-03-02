import { axiosClassic } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "../model/auth.model";
import { getTokens, removeFromStorage, saveTokensStorage } from "../lib/auth-token.lib";

class AuthAPI {
    private BASE_URL = '/Authenticate'

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
}


export const authAPI = new AuthAPI()
