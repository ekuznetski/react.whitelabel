import { EResponseStatus, DocumentsTypeEnum } from '@domain/enums';

export interface IDocumentsInterfaceResponse {
	response: {
		status: EResponseStatus;
		message: IDocuments[];
		messageCode: number;
	};
}

export interface IDocuments {
	id: string;
	document_status: string;
	document_type: DocumentsTypeEnum;
	created: string;
}
