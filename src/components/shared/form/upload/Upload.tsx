import { useCombinedRef } from '@utils/hooks';
import { useDrop, useSetState } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import { UploadEmptyView } from './components';
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

interface UploadState {
  view: UploadViewState;
  file: File | null;
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
    const [uploadState, setState] = useSetState<UploadState>({
      view: UploadViewState.empty,
      file: null,
    });
    const [getDropProps, { isHovering }] = useDrop({
      onFiles: (files: File[], e) => onFilesChanged(files),
    });
    const ref = useCombinedRef(_ref);

    function onFilesChanged(files: File[]) {
      if (files.length) {
        const file = files[0];
        const _fileSize = file.size / 1024;
        const _fileExtension = file.name.split('.').pop();

        // @ts-ignore
        if (_fileSize <= maxFileSizeKb && _fileExtension && accept.includes(_fileExtension)) {
          setState({ file, view: UploadViewState.ready });
        }
      }
    }

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
              'UploadFile must be provided with the Icon through the UploadFile.icon param or UploadFileIcon component',
            );

          function renderView() {
            switch (uploadState.view) {
              case UploadViewState.empty:
                return <UploadEmptyView fieldName={props.fieldName} desc={state.desc} fileIcon={state.fileIcon} />;
              case UploadViewState.error:
                return <UploadEmptyView fieldName={props.fieldName} desc={state.desc} fileIcon={state.fileIcon} />;
              case UploadViewState.loading:
                return <UploadEmptyView fieldName={props.fieldName} desc={state.desc} fileIcon={state.fileIcon} />;
              case UploadViewState.ready:
                return <UploadEmptyView fieldName={props.fieldName} desc={state.desc} fileIcon={state.fileIcon} />;
            }
          }

          return state.fileIcon ? (
            <div className="upload-file-wrapper" ref={ref}>
              <div className={classNames('upload-file__section col', isHovering && 'isHovering')} {...getDropProps}>
                <label className="upload-file__label" onChange={(e) => onFilesChanged(e.target.files)}>
                  <input type="file" accept={accept.map((f) => `.${f}`).join(',')} />
                </label>
                {renderView()}
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
