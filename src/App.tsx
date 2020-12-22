import { Footer, Router } from '@components/core';
import { IntercomChat } from '@components/shared';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { env } from '@env';
import { IStore, ac_updateRouteParams, store } from '@store';
import { useDeviceDetect } from '@utils/hooks';
import classNames from 'classnames';
import React, { Suspense, useEffect, useMemo } from 'react';
import { browserName, osName } from 'react-device-detect';
import TagManager from 'react-gtm-module';
import { hot } from 'react-hot-loader/root';
import { useTranslation } from 'react-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './App.scss';

if (env.PRODUCTION && env.GTM_ID) {
  TagManager.initialize({
    gtmId: env.GTM_ID,
  });
}

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <IntercomChat>
          <Main />
        </IntercomChat>
      </Suspense>
    </Provider>
  );
}

export function Main() {
  const { section } = useSelector<IStore, { section: EAppSection }>((state) => ({
    section: state.app.route.appSection,
  }));
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const device = useDeviceDetect();

  useEffect(() => {
    const _locale = pathname.split('/')[1] as ELanguage;
    if (localesConfig.includes(_locale)) {
      i18n.changeLanguage(_locale);

      dispatch(
        ac_updateRouteParams({
          locale: _locale,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (section) {
      const _root = document.getElementById('root');
      Object.keys(EAppSection).forEach((_section) => _root?.classList.remove(_section));
      _root?.classList.add(section);
    }
  }, [section]);

  return useMemo(() => {
    return (
      <>
        <div
          className={classNames(
            'main-wrapper',
            env.LABEL?.toLowerCase(),
            osName.toLowerCase(),
            browserName.toLowerCase().replace(/mobile|\s/g, ''),
            device.isMobile && 'isMobile',
            device.isTablet && 'isTablet',
            device.isDesktop && 'isDesktop',
          )}
        >
          <Router />
        </div>
        <Footer />
        <div id="dynamic-portals" />
      </>
    );
  }, [section]);
}

export default hot(App);
