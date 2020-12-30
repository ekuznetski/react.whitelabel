import { ECurrencyCode, ECurrencySymbol, EFPQuestionView, EFPSteps } from '@domain/enums';

export interface IFPSubmittedAnswer {
  question: number;
  answer: number;
}

export interface IFPState {
  step: EFPSteps;
  data: IFPSubmittedAnswer[];
  questions: IFPQuestion[];
}

export interface IFPQuestion {
  id: number | { [key: string]: string | null };
  text: (props?: { currencyCode?: ECurrencyCode; currencySymbol?: ECurrencySymbol }) => string;
  view: EFPQuestionView;
  answers: number[];
  step: EFPSteps;
}

export interface IFPAnswer {
  apiId: number;
  text: (props?: { currencyCode?: ECurrencyCode; currencySymbol?: ECurrencySymbol }) => string;
  icon?: string;
  needRemark?: boolean;
}

export interface ISubmitFPRequestItem {
  question: string | number;
  answer: string | number;
  remark?: string;
}

export interface ISubmitFPRequest {
  kyc_answer: any;
}
