import { Footer, Modal, Router } from '@components/core';
import { IntercomChat } from '@components/shared';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { env } from '@env';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ac_updateRouteParams, IStore, store } from '@store';
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

if (env.PRODUCTION) {
  if (env.GTM_ID) {
    TagManager.initialize({
      gtmId: env.GTM_ID,
    });
  }
  if (env.SENTRY_PUBLIC_DSN) {
    Sentry.init({
      dsn: env.SENTRY_PUBLIC_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
}

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <IntercomChat>
          <ErrorProvider>
            <Main />
          </ErrorProvider>
        </IntercomChat>
      </Suspense>
    </Provider>
  );
}

function ErrorProvider(props: { children: React.ReactElement }) {
  return true || env.PRODUCTION ? <Sentry.ErrorBoundary>{props.children}</Sentry.ErrorBoundary> : props.children;
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
        <div id="dynamic-portals">
          <Modal />
        </div>
      </>
    );
  }, [section]);
}

export default hot(App);
