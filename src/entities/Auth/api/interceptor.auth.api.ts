import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getAccessToken, getRefreshToken, saveTokensStorage, removeFromStorage } from '../lib/auth-token.lib';

const apiClient = axios.create({
    baseURL: 'https://bbplace.ru/auth/api',
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let accessToken = getAccessToken();
        if (!accessToken) {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const response: AxiosResponse = await apiClient.post('/Authenticate/refresh-token', {
                        accessToken: getAccessToken(),
                        refreshToken: getRefreshToken()
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    saveTokensStorage(response.data);
                    accessToken = getAccessToken();
                } catch (error) {
                    removeFromStorage();
                    console.error('Ошибка обновления токенов:', error);
                }
            }
        }

        if (accessToken) {
            if (config.headers) {
                config.headers.set('Authorization', `Bearer ${accessToken}`);
            } else {
                config.headers = new AxiosHeaders();
                config.headers.set('Authorization', `Bearer ${accessToken}`);
            }
            config.headers.set('Content-Type', 'application/json');
        } else {
            config.headers = new AxiosHeaders();
            config.headers.set('Content-Type', 'application/json');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;
