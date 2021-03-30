import { EAppSection } from '@domain/enums';
import { IStore } from '@store';
import { useScroll } from 'ahooks';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Notification } from '..';
import { HeaderAuth, HeaderGeneral, HeaderMain, HeaderPortal } from './';
import { TopBar } from './main/components';
import { config } from './main';

export const Header = memo(function Header() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const _scroll = useScroll(document);
  let fixHeader: boolean;

  switch (section) {
    case EAppSection.portal:
      fixHeader = _scroll.top > 110;
      break;
    case EAppSection.main:
      fixHeader = config.topBarLinks.length ? _scroll.top > 30 : true;
      break;
    default:
      fixHeader = true;
  }

  return useMemo(() => {
    const header_class = classNames('header', section, fixHeader && 'fixed');

    return (
      <>
        {section === EAppSection.main && <TopBar />}
        <header className={header_class}>
          <div className="header-wrapper h-100">
            {section === EAppSection.auth && <HeaderAuth fixed={fixHeader} />}
            {section === EAppSection.main && <HeaderMain fixed={fixHeader} />}
            {section === EAppSection.portal && <HeaderPortal fixed={fixHeader} />}
            {section === EAppSection.general && <HeaderGeneral fixed={fixHeader} />}
          </div>
        </header>
        <Notification fixed={fixHeader} />
      </>
    );
  }, [section, fixHeader]);
});
