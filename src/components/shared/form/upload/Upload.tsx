import { Svg } from '@components/shared';
import { useCombinedRef } from '@utils/hooks';
import { useDrop } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { UploadProvider, UploadText, useUploadDispatch } from './upload-context';
import './Upload.scss';

interface UploadProps {
  fieldName: string;
  className?: string;
  uploadSectionClassName?: string;
  description?: UploadText;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  chooseBtn?: UploadText;
  accept?: ('jpg' | 'jpeg' | 'jpe' | 'png' | 'gif' | 'pdf' | 'doc' | 'docx' | 'tiff')[];
  maxFileSizeKb?: number;
  disabled?: boolean;
  errorText?: string;
  isLoading?: (val: boolean) => void;
  isError?: (val: boolean) => void;
}

enum UploadViewState {
  empty = 'empty',
  error = 'error',
  loading = 'loading',
  ready = 'ready',
}

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
    const [view, setView] = React.useState<UploadViewState>(UploadViewState.empty);
    const [files, setFiles] = React.useState([]);
    const [getDropProps, { isHovering }] = useDrop({
      onFiles: (files: File[], e) => console.log(files, e),
    });
    const { t } = useTranslation();
    const ref = useCombinedRef(_ref);

    console.log(getDropProps);

    return (
      <UploadProvider>
        {(state, dispatch) => {
          useEffect(() => {
            if (props.description) {
              dispatch({
                type: 'addDesc',
                desc: props.description,
              });
            }

            if (props.icon) {
              dispatch({
                type: 'addIcon',
                fileIcon: { name: props.icon, width: props.iconWidth, height: props.iconHeight },
              });
            }
          }, []);

          if (!state.fileIcon && !props.icon)
            console.error(
              'UploadFile must be provided with the Icon through the UploadFile.icon param or or UploadFileIcon component',
            );

          return state.fileIcon ? (
            <div className="upload-file-wrapper" ref={ref}>
              <div className={classNames('upload-file__section col', isHovering && 'isHovering')} {...getDropProps}>
                <div className="upload-file__fieldName">{t('Upload File', { fieldName: props.fieldName })}</div>
                {state.desc && <div className="upload-file__desc mt-2 col-8">{state.desc}</div>}
                <div className="upload-file__icon my-9">
                  <Svg href={state.fileIcon?.name} width={state.fileIcon?.width} height={state.fileIcon?.height} />
                </div>
                <div className="upload-file__chooseBtn">
                  <Trans i18nKey="Drag File Here">
                    Drag file here <br /> or <a onClick={console.log}>Browse file</a>
                  </Trans>
                </div>
              </div>
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
