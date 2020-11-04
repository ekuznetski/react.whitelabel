import { IBaseResponse } from '..';

export interface IDocument {
  id: string;
  document_status: string;
  document_type: string;
  created: string;
}

export type IDocumentsInterfaceResponse = {
  response: {
    message: IDocument[];
  };
} & IBaseResponse;
