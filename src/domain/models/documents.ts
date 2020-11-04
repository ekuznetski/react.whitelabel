import { DocumentsTypeEnum, EDocumentsStatus } from '@domain/enums';
import { IDocument } from '@domain/interfaces';
import moment from 'moment';
import { Moment } from 'moment';

export class MDocument {
  id: string;
  document_status: EDocumentsStatus;
  document_type: DocumentsTypeEnum;
  created: Moment;

  constructor(props: IDocument) {
    this.id = props.id;
    this.document_status =
      EDocumentsStatus[props.document_status as keyof typeof EDocumentsStatus] || EDocumentsStatus.pending;
    this.document_type =
      DocumentsTypeEnum[props.document_type as keyof typeof DocumentsTypeEnum] || DocumentsTypeEnum.NoNType;
    this.created = moment(props.created);
  }
}
