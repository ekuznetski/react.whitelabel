import { MDocument } from '@domain/models';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';
import { MultipleUpload, Svg, UploadFile } from '..';
import { UploadWrapperProvider } from './uploadWrapper.context';
import { $t } from './UploadWrapper.locale';
import './UploadWrapper.scss';

export type DocsType = { icon: string; iconHeight?: number; label: string | React.ReactFragment };
export enum EUploadWrapperViewType {
  select = 'select',
  upload = 'upload',
  documents = 'documents',
}

interface IUploadWrapperProps {
  children:
    | React.ReactElement<typeof UploadFile>
    | React.ReactElement<typeof MultipleUpload>
    | React.ReactElement<typeof UploadDocumentCard>
    | React.ReactElement<typeof UploadDocumentCard>[];
  documents: MDocument[];
  viewChanged?: (view: EUploadWrapperViewType) => void;
}

interface IUploadWrapperState {
  view: EUploadWrapperViewType | null;
  documentsTypeList: DocsType[];
  selectedDocTypeIdx: number;
}

export function UploadWrapper({ children, documents, ...props }: IUploadWrapperProps) {
  // const [state, setState] = useSetState<IUploadWrapperState>({
  //   documentsTypeList: [],
  //   selectedDocTypeIdx: 0,
  //   view: null,
  // });

  return (
    <UploadWrapperProvider>
      {(state, dispatch) => {
        useEffect(() => {
          const documentsTypeList: DocsType[] = [];

          if (
            !Array.isArray(children) &&
            !(children.type == UploadFile || children.type == MultipleUpload || children.type == UploadDocumentCard)
          ) {
            throw new Error(
              'UploadWrapper must and could contain only <UploadFile>, <MultiUpload> or <UploadDocumentCard> component',
            );
          } else if (
            (Array.isArray(children) && children.every((child) => child.type == UploadDocumentCard)) ||
            (!Array.isArray(children) && children.type == UploadDocumentCard)
          ) {
            [children].flat().forEach((child) => {
              const _props: any = { ...child.props };
              delete _props.children;
              documentsTypeList.push(_props);
            });
          }

          if (documents?.length) dispatch({ view: EUploadWrapperViewType.documents });
          else if (documentsTypeList.length && documentsTypeList.length > 1) {
            dispatch({ view: EUploadWrapperViewType.select, documentsTypeList });
          } else dispatch({ view: EUploadWrapperViewType.upload });
        }, []);

        function selectDocTypeIdxToUpload(idx: number) {
          dispatch({ activeDocTypeIdx: idx, view: EUploadWrapperViewType.upload });
        }

        function renderView() {
          switch (state.view) {
            case EUploadWrapperViewType.select:
              return (
                <SelectDocumentType
                  typesList={state.documentsTypeList as DocsType[]}
                  onDocTypeSelected={selectDocTypeIdxToUpload}
                />
              );
            case EUploadWrapperViewType.upload:
              return (
                <>
                  <div className="upload-wrapper__header mb-7">
                    <a
                      className="upload-wrapper__back"
                      onClick={() => dispatch({ view: EUploadWrapperViewType.select })}
                    >
                      Back
                    </a>
                    {// @ts-ignore
                    !Array.isArray(children) ? children.props.label : children[state.selectedDocTypeIdx].props.label}
                  </div>
                  {// @ts-ignore
                  !Array.isArray(children) ? children : children[state.selectedDocTypeIdx].props.children}
                </>
              );
            case EUploadWrapperViewType.documents:
              return <DocumentsList documents={documents} />;
          }
        }

        return <div className="upload-wrapper">{renderView()}</div>;
      }}
    </UploadWrapperProvider>
  );
}

export const UploadDocumentCard = memo(function DocumentCard(
  props: DocsType & {
    children: React.ReactElement<typeof UploadFile> | React.ReactElement<typeof MultipleUpload>;
  },
) {
  if (!(props.children.type == UploadFile || props.children.type == MultipleUpload)) {
    throw new Error('UploadWrapper must and could contain only <UploadFile> or <MultiUpload> component');
  }

  return null;
});

interface ISelectDocumentTypeProps {
  typesList: DocsType[];
  onDocTypeSelected: (idx: number) => void;
}

const SelectDocumentType = memo(function SelectDocumentType({
  typesList,
  onDocTypeSelected,
}: ISelectDocumentTypeProps) {
  return (
    <div className="select-document-type">
      <div className="select-document-type__note mb-7">{$t.selectDocumentTypeNote()}</div>
      <div className="select-document-type__list">
        {typesList.map((item, idx) => (
          <div key={idx} className="list__item mx-2" onClick={() => onDocTypeSelected(idx)}>
            <Svg href={item.icon} height={50} className="mb-2" />
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
