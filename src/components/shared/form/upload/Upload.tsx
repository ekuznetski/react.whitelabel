import { Button, EUploadWrapperViewType, useUploadWrapperDispatch } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { ac_uploadDocuments } from '@store';
import { useCombinedRef } from '@utils/hooks';
import { useSetState } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UploadEmptyView, UploadReadyView } from './components';
import {
  UploadDispatch,
  UploadProvider,
  UploadState,
  UploadText,
  UploadViewState,
  useUploadDispatch,
} from './upload.context';
import './Upload.scss';

interface UploadProps {
  fileType: EDocumentsType;
  fieldName: string;
  className?: string;
  uploadSectionClassName?: string;
  description?: UploadText;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx' | 'tiff')[];
  maxFileSizeKb?: number;
  disabled?: boolean;
  errorText?: UploadText;
  transferControls?: false & {
    trackContextState: (state: UploadState) => void;
    regContextDispatch: (dispatch: UploadDispatch) => void;
  };
  isComplete?: () => void;
  isLoading?: () => void;
  isError?: (el: UploadState) => void;
}

interface MultipleUploadProps {
  children: React.ReactElement[];
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx' | 'tiff')[];
  maxFileSizeKb?: number;
  disabled?: boolean;
  isComplete?: () => void;
  isLoading?: () => void;
  isError?: (el: UploadState) => void;
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
      return function(contextData: UploadState) {
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
      return function(contextDispatch: UploadDispatch) {
        setMultiContextDispatch({ [uploadFileId]: contextDispatch });
      };
    }

    function Submit() {
      const uploadDocs = {};
      Object.keys(multiContextState).forEach((key) => {
        Object.assign(uploadDocs, { [multiContextState[key].fileType]: multiContextState[key].file });
        multiContextDispatch[key]({ type: 'uploadFile' });
      });
      dispatch(ac_uploadDocuments(uploadDocs));
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
          <Button
            className="upload-file__btn mt-9"
            disabled={!Object.keys(multiContextState).every((k) => multiContextState[k].view === UploadViewState.ready)}
            onClick={Submit}
          >
            {t('Confirm & Upload')}
          </Button>
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
                  setTimeout(() => {
                    contextDispatch({ type: 'complete' });
                  }, 500);
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
            dispatch(ac_uploadDocuments({ [props.fileType]: new Blob() }));
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
              {!props.transferControls && (
                <Button
                  className="upload-file__btn mt-9"
                  disabled={contextState.view !== UploadViewState.ready}
                  onClick={Submit}
                >
                  {t('Confirm & Upload')}
                </Button>
              )}
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
