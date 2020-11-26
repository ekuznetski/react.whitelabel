import { Img } from '@components/shared';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLoader.scss';

export function PageLoader({ isLoading }: any) {
  const elemRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <div className={classNames('page-loader', !isLoading && 'hide')} ref={elemRef}>
      <Img src="loader.gif" />
      {/* {t('Page loading')} */}
    </div>
  );
}
