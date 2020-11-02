import { Button } from '@components/shared';
import { ac_uploadDocuments } from '@store';
import { useCombinedRef } from '@utils/hooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UploadEmptyView, UploadReadyView } from './components';
import { UploadProvider, UploadText, UploadViewState, useUploadDispatch } from './upload-context';
import './Upload.scss';

interface UploadProps {
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
  transferControls?: false & { onChange: (state: UploadViewState) => void };
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
    const [filesContext, setFilesContext] = useState<UploadViewState[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
      if (!Array.isArray(props.children)) throw new Error('MultiUpload must contain more than one ReactElement');
    }, []);

    return (
      <Row>
        {props.children.map((child, idx) => {
          if (child.type == UploadFile) {
            return (
              <Col key={idx}>
                {React.cloneElement(child, {
                  accept: accept || child.props.accept,
                  maxFileSizeKb: maxFileSizeKb || child.props.maxFileSizeKb,
                  disabled: disabled || child.props.disabled,
                  transferControls: true,
                })}
              </Col>
            );
          }
          return <></>;
        })}
        <Col xs={12}>
          <Button className="upload-file__btn mt-9">{t('Confirm & Upload')}</Button>
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
      // loading: (val) => if (val) this._updateState(EFileDropState.LOADING),
      // uploadError: (val) => if (val) this._updateState(EFileDropState.ERROR),
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
            if (props.description) {
              contextDispatch({
                type: 'addDesc',
                desc: props.description,
              });
            }

            if (props.icon) {
              contextDispatch({
                type: 'addIcon',
                fileIcon: { name: props.icon, width: props.iconWidth, height: props.iconHeight },
              });
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
              
            }, [contextState]);
          }

          if (!contextState.fileIcon && !props.icon)
            console.error(
              'UploadFile must be provided with the Icon through the UploadFile.icon param or UploadFileIcon component',
            );

          function Submit() {
            contextDispatch({ type: 'uploadFile' });
            dispatch(ac_uploadDocuments({ CCBack: new Blob() }));
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
