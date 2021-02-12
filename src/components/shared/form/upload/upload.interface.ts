import { EDocumentsType } from '@domain/enums';
import { MDocument } from '@domain/models';
import { EUploadWrapperViewType } from './Upload';
import { UploadDispatch, UploadState, UploadText } from './upload.context';

export type DocsType = { icon: string; iconHeight?: number; label: string | React.ReactFragment };

export interface IUploadWrapperState {
  view: EUploadWrapperViewType | null;
  documentsTypeList: DocsType[];
  selectedDocTypeIdx: number;
}
export interface UploadProps {
  fileType: EDocumentsType;
  fieldName: string;
  className?: string;
  uploadSectionClassName?: string;
  description?: UploadText;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx')[];
  maxFileSizeKb?: number;
  disabled?: boolean;
  optional?: boolean;
  errorText?: UploadText;
  transferControls?: false & {
    trackContextState: (state: UploadState) => void;
    regContextDispatch: (dispatch: UploadDispatch) => void;
  };
  isComplete?: () => void;
  isLoading?: () => void;
  isError?: (el: UploadState) => void;
}

export interface MultipleUploadProps {
  children: React.ReactElement[];
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx')[];
  maxFileSizeKb?: number;
  label?: string;
  disabled?: boolean;
  isComplete?: () => void;
  isLoading?: () => void;
  isError?: (el: UploadState) => void;
}

export interface ISelectDocumentTypeProps {
  typesList: DocsType[];
  onDocTypeSelected: (idx: number) => void;
}

export interface IDocumentsListProps {
  documents: MDocument[];
}
