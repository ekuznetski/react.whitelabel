import { EResponseStatus } from '@domain/enums';

export interface IHeaderDefaultProps {
  fixed: boolean;
}
export interface IBaseResponse<T = any> {
  response?: {
    [key: string]: any;
    response?: T;
    data?: T;
    status?: EResponseStatus;
    messageCode?: number;
    error?: string;
  };
  [key: string]: any;
}

export type WindowProps = {
  isSSR?: boolean;
  CakePHPCookie?: string;
  __PRELOADED_STATE__?: {
    rawData: {
      url: string;
      data: any;
    }[];
  };
  xRealIP?: string;
};

export type ColNumberAttr = number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Nullable<T> = { [P in keyof T]: T[P] | null | Nullable<T[P]> };

export type AnyFunction<T = void, U = any> = ((...args: U[]) => T) | null;

export type ExtractComponentProps<Type> = Type extends React.NamedExoticComponent<infer X> ? X : never;
