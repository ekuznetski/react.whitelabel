import { Button } from '@components/shared';
import { DocumentsTypeEnum } from '@domain/enums';
import { ac_uploadDocuments } from '@store';
import { deepDifference, shallowEqual } from '@utils/fn';
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
} from './upload-context';
import './Upload.scss';

interface UploadProps {
  fileType: DocumentsTypeEnum;
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
  isLoading?: () => void;
  isError?: () => void;
}

interface MultiUploadProps {
  children: React.ReactElement[];
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx' | 'tiff')[];
  maxFileSizeKb?: number;
  disabled?: boolean;
  isLoading?: () => void;
  isError?: () => void;
}

// not working with HMR
export const MultiUpload = memo(
  forwardRef<HTMLDivElement, MultiUploadProps>(function MultiUpload(
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
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!Array.isArray(props.children)) throw new Error('MultiUpload must contain more than one ReactElement');
    }, []);

    useEffect(() => {
      Object.keys(multiContextState).forEach((key) => {
        const _ = Object.keys(multiContextState);
      });
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

    function Submit() {
      const uploadDocs = {};
      Object.keys(multiContextState).forEach((key) => {
        Object.assign(uploadDocs, { [multiContextState[key].fileType]: multiContextState[key].file });
        multiContextDispatch[key]({ type: 'uploadFile' });
      });
      // dispatch(ac_uploadDocuments(uploadDocs));
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
    const { t } = useTranslation();
    const dispatch = useDispatch();

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
            switch (contextState.view) {
              case UploadViewState.loading:
                props.isLoading?.();
                break;
              case UploadViewState.error:
                props.isError?.();
                break;
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
