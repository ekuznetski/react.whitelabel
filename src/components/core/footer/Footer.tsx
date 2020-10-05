import { EAppSection } from '@domain/enums';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FooterAuth from './auth/FooterAuth';
import FooterMain from './main/FooterMain';
import FooterPortal from './portal/FooterPortal';

export function Footer() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const location = useLocation();

  return useMemo(() => {
    let footer_class = classNames('footer', section);

    return (
      <footer className={footer_class}>
        {section === EAppSection.auth && <FooterAuth />}
        {section === EAppSection.main && <FooterMain />}
        {section === EAppSection.portal && <FooterPortal />}
      </footer>
    );
  }, [section]);
}

export default Footer;
