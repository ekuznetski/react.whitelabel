import { EAppSection } from '@domain/enums';
import { IStore } from '@store';
import { useScroll } from '@utils/hooks';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Notification } from '..';
import { HeaderAuth } from './auth/HeaderAuth';
import { HeaderMain } from './main/HeaderMain';
import { HeaderPortal } from './portal/HeaderPortal';

export const Header = memo(function Header() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const _scroll = useScroll(document);
  const fixHeader = _scroll.top > (section === EAppSection.portal ? 110 : 40);

  return useMemo(() => {
    const header_class = classNames('header', section);

    return (
      <>
        <header className={header_class}>
          <div className="header-wrapper">
            {section === EAppSection.auth && <HeaderAuth fixed={fixHeader} />}
            {section === EAppSection.main && <HeaderMain fixed={fixHeader} />}
            {section === EAppSection.portal && <HeaderPortal fixed={fixHeader} />}
          </div>
        </header>
        <Notification fixed={fixHeader} />
      </>
    );
  }, [section, fixHeader]);
});
