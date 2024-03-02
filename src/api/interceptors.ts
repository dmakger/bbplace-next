import { getAccessToken, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib'
import axios, {type CreateAxiosDefaults} from 'axios'
import { EErrorsApi, errorCatch } from './error'
import { authAPI } from '@/entities/Auth/api/auth.api'

const options:CreateAxiosDefaults = {
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}

// Запросы БЕЗ токена
const axiosClassic = axios.create(options)

// Запросы С токеном
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`
    return config
})


axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        if (
            (error?.response?.status === 401 
                || errorCatch(error) === EErrorsApi.JWT_EXPIRED
                || errorCatch(error) === EErrorsApi.JWT_MUST_BE_PROVIDED
            ) && error.config && !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await authAPI.getNewTokens()
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === EErrorsApi.JWT_EXPIRED)
                    removeFromStorage()
            }
        }
        throw error 
    }
)


export { axiosClassic, axiosWithAuth }