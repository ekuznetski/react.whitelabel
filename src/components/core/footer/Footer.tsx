import { EAppSection } from '@domain/enums';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FooterAuth, FooterMain, FooterPortal } from './components';

export const Footer = memo(function Footer() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const { ready } = useTranslation();

  return useMemo(() => {
    let footer_class = classNames('footer', section || 'notFound');

    return ready ? (
      <footer className={footer_class}>
        {section === EAppSection.auth && <FooterAuth />}
        {section === EAppSection.main && <FooterMain />}
        {section === EAppSection.portal && <FooterPortal />}
        {section === EAppSection.notFound && <FooterAuth hideLinks />}
      </footer>
    ) : null;
  }, [section, ready]);
});
