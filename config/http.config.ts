import { reactive } from 'vue'
import axios from 'axios'
import { convertToCamelCase, convertToSnakeCase } from '~/utils/convert'
import { useHollowStore } from '~/store/hollow'

const hollowStore = useHollowStore()

interface State {
  isLoading: boolean
  error: any
}

const baseUrl = 'http://dev.selfemo.com/api'

export const state: State = reactive({
  isLoading: false,
  error: null,
})

const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(
  (config: any) => {
    state.isLoading = true
    config.headers = hollowStore.userToken
      ? {
          Authorization: `Bearer ${hollowStore.userToken}`,
        }
      : undefined

    if (config.params) {
      config.params = convertToSnakeCase(config.params)
    }
    if (config.data) {
      config.data = convertToSnakeCase(config.data)
    }
    return config
  },
  (error: any) => {
    state.isLoading = false
    state.error = error
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: any) => {
    state.isLoading = false
    response.data = convertToCamelCase(response.data)
    return response
  },
  (error: any) => {
    state.isLoading = false
    state.error = error
    return Promise.reject(error)
  }
)

type MessageType = 'success' | 'error' | 'warning'
export interface ToastMessage {
  type: MessageType
  message: string
}

type SuccessHandler<T> = (data: T) => void
type ErrorHandler = (error: any) => void
type ToastHandler = () => ToastMessage

export async function request<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  onSuccess?: SuccessHandler<T>,
  onError?: ErrorHandler,
  toastHandler?: ToastHandler
): Promise<T | any> {
  try {
    const payload = method === 'get' ? { params: data } : { data }
    const response = await http.request({
      method,
      url,
      ...payload,
    })

    if (onSuccess) {
      onSuccess(response?.data?.data)
    }
  } catch (error: any) {
    if (onError) {
      onError(error)
    }

    state.error = error
  }

  if (toastHandler) {
    const toastConfig = toastHandler()
    ElMessage({
      message: `${toastConfig.message}`,
      type: `${toastConfig.type}`,
      center: true,
      offset: 60,
    })
  }
}
