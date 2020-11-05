import { EDocumentsType } from '@domain/enums';
import { MDocument } from '@domain/models';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';
import { MultiUpload, Svg, UploadFile } from '..';
import { $t } from './UploadWrapper.locale';
import './UploadWrapper.scss';

export type DocsType = { icon: string; iconHeight?: number; label: string | React.ReactFragment };
export enum EUploadWrapperViewType {
  select = 'select',
  upload = 'upload',
  documents = 'documents',
}

interface IUploadWrapperProps {
  children: React.ReactElement<typeof UploadFile> | React.ReactElement<typeof MultiUpload>;
  documents: MDocument[];
  documentsTypeList?: DocsType[];
  viewChanged?: (view: EUploadWrapperViewType) => void;
}

interface IUploadWrapperState {
  view: EUploadWrapperViewType | null;
}

export function UploadWrapper({ documentsTypeList, children, documents, ...props }: IUploadWrapperProps) {
  const [state, setState] = useSetState<IUploadWrapperState>({
    view: null,
  });

  useEffect(() => {
    if (children && !(children.type == UploadFile || children.type == MultiUpload)) {
      throw new Error('UploadWrapper must and could contain only <UploadFile> or <MultiUpload> component');
    }

    if (documents?.length) setState({ view: EUploadWrapperViewType.documents });
    else if (documentsTypeList && documentsTypeList.length > 1) setState({ view: EUploadWrapperViewType.select });
    else setState({ view: EUploadWrapperViewType.upload });
  }, []);

  function renderView() {
    switch (state.view) {
      case EUploadWrapperViewType.select:
        return <SelectDocumentType typesList={documentsTypeList as DocsType[]} />;
      case EUploadWrapperViewType.upload:
        return children;
      case EUploadWrapperViewType.documents:
        return <DocumentsList documents={documents} />;
    }
  }

  return <div className="upload-wrapper">{renderView()}</div>;
}

interface ISelectDocumentTypeProps {
  typesList: DocsType[];
}

const SelectDocumentType = memo(function SelectDocumentType({ typesList }: ISelectDocumentTypeProps) {
  return (
    <div className="select-document-type">
      <div className="select-document-type__note mb-7">{$t.selectDocumentTypeNote()}</div>
      <div className="select-document-type__list">
        {typesList.map((item, idx) => (
          <div key={idx} className="list__item mx-2">
            <Svg href={item.icon} height={60} className="mb-2"/>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
});

interface IDocumentsListProps {
  documents: MDocument[];
}

const DocumentsList = memo(function DocumentsList({ documents }: IDocumentsListProps) {
  return (
    <div className="documents-list">
      {documents.map((document) => (
        <div
          key={document.id}
          className={classNames('documents-list__item mb-3 py-2 pr-2', document.document_status.toLowerCase())}
        >
          <Svg href="imageType_small" height={16} className="ml-4 mr-3" />
          <div className="document__type mr-auto">{document.document_type}</div>
          <div className="document__status">{$t.documentStatus(document.document_status)}</div>
        </div>
      ))}
    </div>
  );
});
