import { getAccessToken, removeFromStorage } from '@/entities/Auth/lib/auth-token.lib'
import axios, {CreateAxiosDefaults} from 'axios'
import { EErrorsApi, errorCatch } from './error'

export const options: CreateAxiosDefaults = {
    // baseURL: process.env.API_URL,
    baseURL: "https://bbplace.ru/",
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
}