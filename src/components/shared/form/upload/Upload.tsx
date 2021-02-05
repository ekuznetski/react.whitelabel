import { Svg } from '@components/shared';
import { ENotificationType } from '@domain/enums';
import { MDocument } from '@domain/models';
import { ac_showNotification, ac_uploadDocuments } from '@store';
import { useCombinedRef } from '@utils/hooks';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from '../button/Button';
import { UploadEmptyView, UploadReadyView } from './components';
import { UploadWrapperProvider, useUploadWrapperDispatch } from './upload-wrapper.context';
import {
  UploadAction,
  UploadDispatch,
  UploadProvider,
  UploadState,
  UploadText,
  UploadViewState,
  useUploadDispatch,
} from './upload.context';
import {
  DocsType,
  IDocumentsListProps,
  ISelectDocumentTypeProps,
  MultipleUploadProps,
  UploadProps,
} from './upload.interface';
import './Upload.scss';

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
  className?: string;
  viewChanged?: (view: EUploadWrapperViewType) => void;
}

// not working with HMR
export const MultipleUpload = memo(
  forwardRef<HTMLDivElement, MultipleUploadProps>(function MultipleUpload(
    {
      accept = ['jpg', 'jpeg', 'jpe', 'png', 'gif', 'pdf', 'doc', 'docx', 'tiff'],
      maxFileSizeKb = 15 * 1024, // 15mb
      disabled = false,
      ...props
    },
    _ref,
  ) {
    const [multiContextDispatch, setMultiContextDispatch] = useSetState<{ [k: string]: any }>({});
    const [multiContextState, setMultiContextState] = useSetState<{ [k: string]: any }>({});
    const wrapperDispatch = useUploadWrapperDispatch();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
      if (!Array.isArray(props.children)) throw new Error('MultiUpload must contain more than one ReactElement');
    }, []);

    useEffect(() => {
      const _ = Object.keys(multiContextState);

      if (_.every((key) => multiContextState[key].view === UploadViewState.loading)) {
        props.isLoading?.();
      } else if (_.every((key) => multiContextState[key].view === UploadViewState.complete)) {
        wrapperDispatch?.({ view: EUploadWrapperViewType.documents });
        props.isComplete?.();
      } else if (_.some((key) => multiContextState[key].view === UploadViewState.error)) {
        props.isError?.(
          multiContextState[_.find((key) => multiContextState[key].view === UploadViewState.error) as string],
        );
      }
    }, [multiContextState]);

    function trackUploadFileContext(uploadFileId: string) {
      return function (contextData: UploadState) {
        // if (multiContextState[uploadFileId] && !shallowEqual(multiContextState[uploadFileId], contextData)) {
        //   const diff = deepDifference(multiContextState[uploadFileId], contextData);
        //   if (diff.view && multiContextState[uploadFileId] == UploadViewState.error) {
        //     Object.keys(multiContextDispatch)
        //       .filter((k) => k != uploadFileId)
        //       .forEach((key) => {
        //         multiContextDispatch[key]({
        //           type: contextData.view == UploadViewState.error ? 'showError' : 'removeFile',
        //         });
        //       });
        //   }
        // }

        setMultiContextState({ [uploadFileId]: contextData });
      };
    }

    function regUploadFileContextDispatch(uploadFileId: string) {
      return function (contextDispatch: UploadDispatch) {
        setMultiContextDispatch({ [uploadFileId]: contextDispatch });
      };
    }

    function everyUploadContextDispatch(payload: UploadAction) {
      Object.keys(multiContextState).forEach((key) => {
        multiContextDispatch[key](payload);
      });
    }

    function checkEveryUploadState(state: UploadViewState) {
      return Object.keys(multiContextState).every((k) => multiContextState[k].view === state);
    }

    function checkSomeUploadState(state: UploadViewState) {
      return Object.keys(multiContextState).some((k) => multiContextState[k].view === state);
    }

    function Submit() {
      const uploadDocs = {};
      Object.keys(multiContextState).forEach((key) => {
        Object.assign(uploadDocs, { [multiContextState[key].fileType]: multiContextState[key].file });
        multiContextDispatch[key]({ type: 'uploadFile' });
      });

      dispatch(
        ac_uploadDocuments(
          uploadDocs,
          () => {
            everyUploadContextDispatch({ type: 'complete' });
            dispatch(
              ac_showNotification({
                type: ENotificationType.success,
                message: 'Documents has been uploaded',
              }),
            );
          },
          () => {
            everyUploadContextDispatch({ type: 'error' });
            dispatch(
              ac_showNotification({
                type: ENotificationType.danger,
                message: 'Documents upload error. Please contact us to resolve the issue',
              }),
            );
          },
        ),
      );
    }

    return (
      <Row>
        {props.children.map((child, idx) => {
          if (child.type == UploadFile) {
            const _id = `uf${idx}`;
            return (
              <Col key={idx}>
                {React.cloneElement(child, {
                  accept: accept || child.props.accept,
                  maxFileSizeKb: maxFileSizeKb || child.props.maxFileSizeKb,
                  disabled: disabled || child.props.disabled,
                  transferControls: {
                    trackContextState: trackUploadFileContext(_id),
                    regContextDispatch: regUploadFileContextDispatch(_id),
                  },
                })}
              </Col>
            );
          }
          return <></>;
        })}
        <Col xs={12}>
          {!checkSomeUploadState(UploadViewState.error) ? (
            <Button
              className="upload-file__btn mt-9"
              disabled={!checkEveryUploadState(UploadViewState.ready)}
              onClick={Submit}
            >
              {t('Confirm & Upload')}
            </Button>
          ) : (
            <Button
              className="upload-file__btn red mt-9"
              onClick={() => everyUploadContextDispatch({ type: 'removeFile' })}
            >
              {t('Reassign all documents')}
            </Button>
          )}
        </Col>
      </Row>
    );
  }),
);

export const UploadFile = memo(
  forwardRef<HTMLDivElement, UploadProps>(function UploadFile(
    {
      accept = ['jpg', 'jpeg', 'jpe', 'png', 'gif', 'pdf', 'doc', 'docx', 'tiff'],
      maxFileSizeKb = 15 * 1024, // 15mb
      disabled = false,
      ...props
    },
    _ref,
  ) {
    const wrapperDispatch = useUploadWrapperDispatch();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
      <UploadProvider>
        {(contextState, contextDispatch) => {
          const ref = useCombinedRef(_ref);

          useEffect(() => {
            contextDispatch({
              type: 'initFile',
              fileType: props.fileType,
              desc: props.description || undefined,
              fileIcon: props.icon ? { name: props.icon, width: props.iconWidth, height: props.iconHeight } : undefined,
            });

            if (props.transferControls) {
              props.transferControls?.regContextDispatch?.(contextDispatch);
            }
          }, []);

          useEffect(() => {
            if (!props.transferControls) {
              switch (contextState.view) {
                case UploadViewState.loading:
                  // setTimeout(() => {
                  //   contextDispatch({ type: 'complete' });
                  // }, 500);
                  props.isLoading?.();
                  break;
                case UploadViewState.complete:
                  wrapperDispatch?.({ view: EUploadWrapperViewType.documents });
                  props.isComplete?.();
                  break;
                case UploadViewState.error:
                  props.isError?.(contextState);
                  break;
              }
            }
          }, [contextState.view]);

          if (props.transferControls) {
            useEffect(() => {
              props.transferControls?.trackContextState?.(contextState);
            }, [contextState]);
          }

          if (!contextState.fileIcon && !props.icon)
            console.error(
              'UploadFile must be provided with the Icon through the UploadFile.icon param or UploadFileIcon component',
            );

          function Submit() {
            contextDispatch({ type: 'uploadFile' });
            dispatch(
              ac_uploadDocuments(
                { [contextState.fileType as string]: contextState.file },
                () => {
                  contextDispatch({ type: 'complete' });
                  dispatch(
                    ac_showNotification({
                      type: ENotificationType.success,
                      message: 'Documents has been uploaded',
                    }),
                  );
                },
                () => {
                  contextDispatch({ type: 'error' });
                  dispatch(
                    ac_showNotification({
                      type: ENotificationType.danger,
                      message: 'Documents upload error. Please contact us to resolve the issue',
                    }),
                  );
                },
              ),
            );
          }

          function renderView() {
            switch (contextState.view) {
              case UploadViewState.empty:
                return (
                  <UploadEmptyView
                    fieldName={props.fieldName}
                    accept={accept}
                    maxFileSizeKb={maxFileSizeKb}
                    errorText={props.errorText}
                  />
                );
              case UploadViewState.error:
              case UploadViewState.loading:
              case UploadViewState.complete:
              case UploadViewState.ready:
                return <UploadReadyView fieldName={props.fieldName} />;
            }
          }

          return contextState.fileIcon ? (
            <div className="upload-file-wrapper" ref={ref}>
              <div className={classNames('upload-file__section', contextState.view !== UploadViewState.empty && 'col')}>
                {renderView()}
              </div>
              {!props.transferControls &&
                (contextState.view !== UploadViewState.error ? (
                  <Button
                    className="upload-file__btn mt-9"
                    disabled={contextState.view !== UploadViewState.ready}
                    onClick={Submit}
                  >
                    {t('Confirm & Upload')}
                  </Button>
                ) : (
                  <Button className="upload-file__btn red mt-9" onClick={() => contextDispatch({ type: 'removeFile' })}>
                    {t('Upload another document')}
                  </Button>
                ))}
            </div>
          ) : null;
        }}
      </UploadProvider>
    );
  }),
);

export const UploadFileDesc = memo(function UploadFileDesc(props: {
  className?: string;
  children?: UploadText;
  value?: UploadText;
}) {
  const dispatch = useUploadDispatch();

  useEffect(() => {
    dispatch({
      type: 'addDesc',
      desc: props.children || props.value,
    });
  }, []);

  return null;
});

export const UploadFileIcon = memo(function UploadFileIcon(props: {
  className?: string;
  name: string;
  width?: number;
  height?: number;
}) {
  const dispatch = useUploadDispatch();

  useEffect(() => {
    dispatch({
      type: 'addIcon',
      fileIcon: { name: props.name, width: props.width, height: props.height },
    });
  }, []);

  return null;
});

export const UploadWrapper = memo(function UploadWrapper({ children, documents, ...props }: IUploadWrapperProps) {
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

          if (documents.length) dispatch({ view: EUploadWrapperViewType.documents });
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
                  {!!state.documentsTypeList.length && (
                    <div className="upload-wrapper__header mb-7">
                      <a
                        className="upload-wrapper__back"
                        onClick={() => dispatch({ view: EUploadWrapperViewType.select })}
                      >
                        Back
                      </a>
                      {
                        // @ts-ignore
                        !Array.isArray(children) ? children.props.label : children[state.selectedDocTypeIdx].props.label
                      }
                    </div>
                  )}
                  {
                    // @ts-ignore
                    !Array.isArray(children) ? children : children[state.selectedDocTypeIdx].props.children
                  }
                </>
              );
            case EUploadWrapperViewType.documents:
              return <DocumentsList documents={documents} />;
          }
        }

        return <div className={classNames('upload-wrapper', props.className)}>{renderView()}</div>;
      }}
    </UploadWrapperProvider>
  );
});

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

const SelectDocumentType = memo(function SelectDocumentType({
  typesList,
  onDocTypeSelected,
}: ISelectDocumentTypeProps) {
  const { t } = useTranslation();

  return (
    <div className="select-document-type">
      <div className="select-document-type__note mb-7">{t('Choose Document From List')}</div>
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

const DocumentsList = memo(function DocumentsList({ documents }: IDocumentsListProps) {
  const { t } = useTranslation();

  return (
    <div className="documents-list">
      {documents.map((document) => (
        <div
          key={document.type}
          className={classNames('documents-list__item mb-3 py-2 pr-2', document.status.toLowerCase())}
        >
          <Svg href="imageType_small" height={16} className="ml-4 mr-3" />
          <div className="document__type mr-auto">{document.type}</div>
          <div className="document__status">{t(`Client Status:${document.status}`)}</div>
        </div>
      ))}
    </div>
  );
});
