import { EFPQuestionView, EFPSteps } from '@domain/enums';

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
  text: string;
  view: EFPQuestionView;
  answers: number[];
  step: EFPSteps;
}
export interface IFPAnswer {
  apiId: number;
  text: string;
  icon?: string;
  needRemark?: boolean;
}
