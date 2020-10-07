import { EResponseStatus } from '@domain/enums';

export interface IHeaderDefaultProps {
  fixed: boolean;
}
export interface IBaseResponse {
  response?: {
    [key: string]: any;
    status?: EResponseStatus;
    messageCode?: number;
    error?: string;
  };
}

export type Nullable<T> = { [P in keyof T]: T[P] | null | Nullable<T[P]> };

export type AnyFunction<T = void, U = any> = ((...args: U[]) => T) | null;
