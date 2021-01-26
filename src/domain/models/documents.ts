import { EDocumentsStatus, EDocumentsType } from '@domain/enums';
import { IDocument } from '@domain/interfaces';
import moment from 'moment';
import { Moment } from 'moment';

export class MDocuments {
  list: MDocument[] = [];

  constructor(props: IDocument[]) {
    this.list = props.map((document) => new MDocument(document));
  }

  getStatusByDocumentType = (type: EDocumentsType): EDocumentsStatus => {
    return (
      this.list.find((document) => document.document_type === type)?.document_status || EDocumentsStatus.NotSubmitted
    );
  };

  getAllDocumentsOfTypes = (type: EDocumentsType | EDocumentsType[]): any => {
    type = [type].flat();
    return this.list.filter((document) => type.includes(document.document_type));
  };
}

export class MDocument {
  id: string;
  document_status: EDocumentsStatus;
  document_type: EDocumentsType;
  created: Moment;

  constructor(props: IDocument) {
    this.id = props.id;
    this.document_status =
      EDocumentsStatus[props.document_status as keyof typeof EDocumentsStatus] || EDocumentsStatus.Pending;
    this.document_type = EDocumentsType[props.document_type as keyof typeof EDocumentsType] || EDocumentsType.NoNType;
    this.created = moment(props.created);
  }
}
