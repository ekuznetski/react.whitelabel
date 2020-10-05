import { useDebounceEffect } from 'ahooks';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLoader.scss';

export function PageLoader({ isLoading }: any) {
  const elemRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();

  useDebounceEffect(
    () => {
      if (elemRef.current) {
        elemRef.current.style.display = isLoading ? 'flex' : 'none';
      }
    },
    [isLoading],
    { wait: isLoading ? 350 : 0 },
  );

  return (
    <div className={classNames('page-loader', !isLoading && 'hide')} ref={elemRef}>
      {t('Page loading')}
    </div>
  );
}
