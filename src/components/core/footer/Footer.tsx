import { EAppSection } from '@domain/enums';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const FooterAuth = React.lazy(() => import('./auth/FooterAuth'));
const FooterMain = React.lazy(() => import('./main/FooterMain'));
const FooterPortal = React.lazy(() => import('./portal/FooterPortal'));

export const Footer = memo(function Footer() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const { ready } = useTranslation();

  return useMemo(() => {
    let footer_class = classNames('footer', section);

    return ready ? (
      <footer className={footer_class}>
        {section === EAppSection.auth && <FooterAuth />}
        {section === EAppSection.main && <FooterMain />}
        {section === EAppSection.portal && <FooterPortal />}
      </footer>
    ) : null;
  }, [section, ready]);
});

export default Footer;
