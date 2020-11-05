import { EDocumentsType, EDocumentsStatus } from '@domain/enums';
import { IDocument } from '@domain/interfaces';
import moment from 'moment';
import { Moment } from 'moment';

export class MDocument {
  id: string;
  document_status: EDocumentsStatus;
  document_type: EDocumentsType;
  created: Moment;

  constructor(props: IDocument) {
    this.id = props.id;
    this.document_status =
      EDocumentsStatus[props.document_status as keyof typeof EDocumentsStatus] || EDocumentsStatus.pending;
    this.document_type =
      EDocumentsType[props.document_type as keyof typeof EDocumentsType] || EDocumentsType.NoNType;
    this.created = moment(props.created);
  }
}
