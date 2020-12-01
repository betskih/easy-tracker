import { AnyAction } from 'redux';

export interface IApiRequest {
  url: string;
  method?: string;
  body?: any;
  headers?: { [k: string]: string };
  responseType?: null | 'arraybuffer' | 'blob' | 'formData' | 'json' | 'text';
}

type ErrorHandler = (status: number) => string;

export interface IMeta {
  errorMessage?: string;
  errorHandler?: ErrorHandler;
  errorAutoClose?: boolean;
  no404error?: boolean;
  isReloading?: boolean;
}

export interface IApiAction extends AnyAction {
  type: string;
  request: IApiRequest;
  meta?: any;
}

export interface IApiActionSuccess extends AnyAction {
  type: string;
  meta: {
    request?: IApiRequest;
    [k: string]: any;
  };
  data: any;
}

export interface IApiActionError extends AnyAction {
  type: string;
  meta: {
    request: IApiRequest;
  };
  error: Response;
}
