import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/utils-cookie'

export const request: AxiosRequest = axios.create({
    timeout: 90000,
    headers: {
        platform: 'manager'
    }
})

function inizeNotice(response: AxiosResponse) {
    if (response.data.code !== 200) {
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
}

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => inizeNotice(response),
    error => Promise.reject(error)
)
