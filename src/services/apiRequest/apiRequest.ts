export interface ApiRequest {
  get<T extends Record<string, any>>(urlStr: string, qc?: Record<string, any>): Promise<T>;
  post<T extends Record<string, any>>(urlStr: string, body: Record<string, any>): Promise<T>;
  delete(urlStr: string): Promise<void>;
}
