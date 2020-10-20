import { Svg } from '@components/shared';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { UploadIcon, UploadText } from '../upload-context';

interface UploadEmptyViewProps {
  fieldName: string;
  desc: UploadText;
  fileIcon: UploadIcon;
}

export const UploadEmptyView = memo(function UploadEmptyView({ fieldName, desc, fileIcon }: UploadEmptyViewProps) {
  const { t } = useTranslation();

  return (
    <div className="upload-file__empty-view">
      <div className="upload-file__fieldName">{t('Upload File', { fieldName: fieldName })}</div>
      {desc && <div className="upload-file__desc mt-2 col-8">{desc}</div>}
      <div className="upload-file__icon my-9">
        <Svg href={fileIcon?.name} width={fileIcon?.width} height={fileIcon?.height} />
      </div>
      <div className="upload-file__chooseBtn">
        <Trans i18nKey="Drag File Here">
          Drag file here <br /> or <a onClick={console.log}>Browse file</a>
        </Trans>
      </div>
    </div>
  );
});
