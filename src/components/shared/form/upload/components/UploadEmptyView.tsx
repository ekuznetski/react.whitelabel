import { Svg } from '@components/shared';
import { formatNumberWithCommas } from '@utils/fn';
import { useDrop } from 'ahooks';
import classNames from 'classnames';
import React, { createRef, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { UploadText, UploadViewState, useUploadDispatch, useUploadState } from '../upload-context';

interface UploadEmptyViewProps {
  fieldName: string;
  accept: string[];
  maxFileSizeKb: number;
  errorText?: UploadText;
}

export const UploadEmptyView = memo(function UploadEmptyView({
  fieldName,
  accept,
  maxFileSizeKb,
  ...props
}: UploadEmptyViewProps) {
  const [getDropProps, { isHovering }] = useDrop({
    onFiles: (files: File[], e) => onFilesChanged(files),
  });
  const { desc, fileIcon, view } = useUploadState();

  const dispatch = useUploadDispatch();
  const { t } = useTranslation();
  const labelRef = createRef<HTMLLabelElement>();

  function onFilesChanged(files: File[]) {
    console.log(files);
    if (files.length) {
      const file = files[0];
      const _fileSize = file.size / 1024;
      const _fileExtension = file.name.split('.').pop();

      // @ts-ignore
      if (_fileSize <= maxFileSizeKb && _fileExtension && accept.includes(_fileExtension)) {
        if (file?.type.includes('image')) {
          const reader = new FileReader();
          reader.onload = () => {
            const fileDataURL = reader.result as string;
            dispatch({
              type: 'addFile',
              file: file,
              fileDataURL,
            });
          };
          reader.readAsDataURL(file);
        } else {
          dispatch({
            type: 'addFile',
            file: file,
          });
        }
      } else {
        if (_fileSize > maxFileSizeKb) {
          dispatch({
            type: 'showError',
            error:
              props.errorText ||
              t('File Size Exceed Limit', {
                size: formatNumberWithCommas(_fileSize.toFixed(0)),
                limit: formatNumberWithCommas(maxFileSizeKb.toFixed(0)),
              }),
          });
        } else if (!_fileExtension) {
          dispatch({
            type: 'showError',
            error: t('File Extension Not Detected'),
          });
        } else if (_fileExtension && !accept.includes(_fileExtension)) {
          dispatch({
            type: 'showError',
            error: t('File Extension Not Allowed', { ext: _fileExtension }),
          });
        }
      }
    }
  }

  function sectionClickHandler() {
    if (view === UploadViewState.empty && labelRef.current) {
      labelRef.current.click();
    }
  }

  return (
    <div
      className={classNames('upload-file__drop-zone', isHovering && 'isHovering')}
      {...getDropProps}
      onClick={sectionClickHandler}
    >
      <label className="upload-file__label" ref={labelRef}>
        <input
          type="file"
          accept={accept.map((f) => `.${f}`).join(',')}
          onChange={(e) => onFilesChanged(e.target.files as any)}
        />
      </label>
      <div className="upload-file__empty-view">
        <div className="upload-file__field-title">{t('Upload File', { fieldName: fieldName })}</div>
        {desc && <div className="upload-file__desc mt-2 col-8">{desc}</div>}
        <div className="upload-file__icon my-9">
          <Svg href={fileIcon?.name} width={fileIcon?.width} height={fileIcon?.height} />
        </div>
        <div className="upload-file__nav">
          <Trans i18nKey="Drag File Here">
            Drag file here <br /> or <a onClick={console.log}>Browse file</a>
          </Trans>
        </div>
      </div>
    </div>
  );
});
