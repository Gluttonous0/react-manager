import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import { hideLoading, showLoading } from './loading'
import storage from './storage'
import env from '@/config'
console.log('config', env)

//创建实例对象
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    const data = response.data
    hideLoading()
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.remove('token')
      // location.href = '/login'
    } else if (data.code != 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    console.log('error')
    hideLoading()
    message.error(error.msg)
    return Promise.reject(error.msg)
  }
)

export default {
  get<T>(url: string, params?: any): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: any): Promise<T> {
    return instance.post(url, params)
  }
}
