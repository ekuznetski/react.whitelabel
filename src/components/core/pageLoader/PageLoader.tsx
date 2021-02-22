import { Img } from '@components/shared';
import { useLockScroll } from '@utils/hooks';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';
import './PageLoader.scss';

export const PageLoader = memo(function PageLoader({ isLoading, overlay = false }: any) {
  const elemRef = React.createRef<HTMLDivElement>();
  const { setScrollLock } = useLockScroll();

  useEffect(() => {
    setScrollLock(isLoading);
  }, [isLoading]);

  return (
    <div className={classNames('page-loader', !isLoading && 'hide', overlay && 'overlay')} ref={elemRef}>
      {!overlay && <Img src="loader.gif" />}
      {/* {t('Page loading')} */}
    </div>
  );
});
