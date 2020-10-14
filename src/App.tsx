import { Footer, Header, Router } from '@components/core';
import { localesConfig } from '@domain';
import { ELanguage } from '@domain/enums';
import { ac_updateRouteParams, store } from '@store';
import React, { Suspense, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useTranslation } from 'react-i18next';
import { connect, Provider, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './App.scss';
import { browserName, osName } from 'react-device-detect';
import classNames from 'classnames';
import { useDeviceDetect } from '@utils/hooks';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <WrappedMain />
      </Suspense>
    </Provider>
  );
}

function Main() {
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

  return (
    <>
      <div
        className={classNames(
          'main-wrapper',
          osName.toLowerCase(),
          browserName.toLowerCase().replace(/mobile|\s/g, ''),
          device.isMobile && 'isMobile',
          device.isTablet && 'isTablet',
          device.isDesktop && 'isDesktop',
        )}
      >
        <Header />
        <main className="router-context">
          <Router />
        </main>
      </div>
      <Footer />
    </>
  );
}

export const WrappedMain = connect()(Main);
export default hot(App);
