import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpError } from './http-error'

export interface HttpParams {
  [s: string]: any
}

export interface HttpOptions {
  timeout?: number,
  headers?: any
}

export interface HttpAdapterInterface {
  get(path: string, query?: HttpParams, options?: HttpOptions): Promise<any>

  post(path: string, data?: HttpParams, options?: HttpOptions): Promise<any>

  delete(path: string, options?: HttpOptions): Promise<any>

  put(path: string, data: HttpParams, options?: HttpOptions): Promise<any>
}

export class HttpAdapter implements HttpAdapterInterface {

  private http: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.http = axios.create(config)
  }

  private async decodeResponse<T>(promise: Promise<AxiosResponse>): Promise<T> {
    try {
      const response: AxiosResponse = await promise
      return response.data
    } catch (error) {
      throw new HttpError(error)
    }
  }

  delete<T = any>(path: string, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.delete(path, { ...options }))
  }

  get<T = any>(path: string, params?: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.get(path, { ...options, params }))
  }

  post<T = any>(path: string, data?: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.post(path, data, { ...options }))
  }

  put<T = any>(path: string, data: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.put(path, data, { ...options }))
  }

}
