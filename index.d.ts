export interface AxiosRequestTransformer<D = any> {
  (data: D, headers?: any): D;
}

export interface AxiosResponseTransformer<R = any> {
    (data: R, headers?: any): R;
}

export interface AxiosAdapter<R = any, D = any, P = any> {
  (config: AxiosRequestConfig<R, D, P>): AxiosPromise<R>;
}

export interface AxiosBasicCredentials {
  username: string;
  password: string;
}

export interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password:string;
  };
  protocol?: string;
}

export type Method = 
  | 'get' 
  | 'delete' 
  | 'head' 
  | 'options' 
  | 'post' 
  | 'put' 
  | 'patch'

export type ResponseType = 
  | 'arraybuffer' 
  | 'blob' 
  | 'document' 
  | 'json' 
  | 'text' 
  | 'stream'

export interface AxiosRequestConfig<R = any, D = any, P = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer<D> | AxiosRequestTransformer<D>[];
  transformResponse?: AxiosResponseTransformer<R> | AxiosResponseTransformer<R>[];
  headers?: any;
  params?: P;
  paramsSerializer?: (params: P) => string;
  data?: D;
  timeout?: number;
  withCredentials?: boolean;
  adapter?: AxiosAdapter<R, D, P>;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
}

export interface AxiosResponse<R = any>  {
  data: R;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;
}

export type AxiosPromise<R = any> = Promise<AxiosResponse<R>>

export interface CancelStatic {
  new (message?: string): Cancel;
}

export interface Cancel {
  message: string;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken;
  source(): CancelTokenSource;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export interface AxiosInterceptorManager<T> {
  use(onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any): number;
  eject(id: number): void;
}

export interface AxiosInstance<R = any, D = any, P = any> {
  (config: AxiosRequestConfig<R, D, P>): AxiosPromise<R>;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig<R, D, P>>;
    response: AxiosInterceptorManager<AxiosResponse<R>>;
  };
  request<r = R, d = D, p = P> (config: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  get<r = R, d = D, p = P>(url: string, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  delete<r = R, d = D, p = P>(url: string, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  head<r = R, d = D, p = P>(url: string, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  post<r = R, d = D, p = P>(url: string, data?: D, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  put<r = R, d = D, p = P>(url: string, data?: D, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
  patch<r = R, d = D, p = P>(url: string, data?: D, config?: AxiosRequestConfig<r, d, p>): AxiosPromise<r>;
}

export interface AxiosStatic extends AxiosInstance {
  create<R = any, D = any, P = any>(config?: AxiosRequestConfig<R, D, P>): AxiosInstance<R, D, P>;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

declare const Axios: AxiosStatic;

export default Axios;
