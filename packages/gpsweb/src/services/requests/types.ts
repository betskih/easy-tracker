import { AnyAction } from 'redux';

export interface IApiRequest {
  url: string;
  method?: string;
  data?: any;
  headers?: { [k: string]: string };
  responseType?: null | 'arraybuffer' | 'blob' | 'formData' | 'json' | 'text';
}

export interface IApiAction extends AnyAction {
  type: string;
  request: IApiRequest;
  meta?: any;
}
