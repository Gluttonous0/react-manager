import axios, { AxiosError } from 'axios'

import { message } from 'antd'
import { hideLoading, showLoading } from './loading'
//创建实例对象
const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    showLoading()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token::' + token
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
      localStorage.removeItem('token')
      // location.href = '/login'
    } else if (data.code != 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.msg)
    return Promise.reject(error.msg)
  }
)

export default {
  get<T>(url: string, params?: any): Promise<T> {
    return axios.get(url, { params })
  },
  post<T>(url: string, params?: any): Promise<T> {
    return axios.post(url, params)
  }
}
