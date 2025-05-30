import { toast } from 'sonner';

export type ApiClientOptions = {
  baseURL?: string;
};

export type ApiRequestOptions = {
  params?: Record<string, string | number>;
  skipHandleError?: boolean;
};

type ApiResponse = {
  message: string;
  statusCode: number;
  data: unknown;
  success: boolean;
};

export class ApiClient {
  constructor(private options?: ApiClientOptions) {}

  async get<TRes>(url: string, options?: ApiRequestOptions): Promise<TRes> {
    return this.request('GET', url, null, options) as TRes;
  }

  async post<TRes, TReq = unknown>(url: string, data?: TReq, options?: ApiRequestOptions): Promise<TRes> {
    return this.request('POST', url, data, options) as TRes;
  }

  async put<TRes, TReq = unknown>(url: string, data?: TReq, options?: ApiRequestOptions): Promise<TRes> {
    return this.request('PUT', url, data, options) as TRes;
  }

  async delete<TRes>(url: string, options?: ApiRequestOptions): Promise<TRes> {
    return this.request('DELETE', url, null, options) as TRes;
  }

  private async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data: unknown,
    options?: ApiRequestOptions
  ): Promise<unknown> {
    const finalUrl = (this.options?.baseURL || '') + url;

    const init: RequestInit = { method };
    if (data instanceof FormData) {
      init.body = data;
      // init.headers = { 'content-type': 'multipart/form-data' };
    } else {
      init.headers = { 'content-type': 'application/json' };
      init.body = data ? JSON.stringify(data) : void 0;
    }

    const res = await fetch(finalUrl, init);
    if (res.status === 401) {
      const url = `/signin?redirect=${encodeURIComponent(window.location.pathname)}`;
      window.location.href = url;
    }
    const [status, resData]: [number, ApiResponse] = await Promise.all([res.status, res.json()]);
    if ((status < 200 && status >= 300) || resData?.success !== true) {
      // 没有明确说跳过错误处理，就提示错误
      if (options?.skipHandleError !== true) {
        toast.error(resData.message || 'Unknow error');
      }
      // 继续往外抛错误
      return Promise.reject(resData);
    }
    return resData.data;
  }
}

export const apiClient = new ApiClient({ baseURL: '/agent-api' });
