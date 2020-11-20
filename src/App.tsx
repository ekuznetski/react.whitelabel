import { Footer, Header, Router } from '@components/core';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { ac_updateRouteParams, IStore, store } from '@store';
import { useDeviceDetect } from '@utils/hooks';
import classNames from 'classnames';
import React, { Suspense, useEffect } from 'react';
import { browserName, osName } from 'react-device-detect';
import { hot } from 'react-hot-loader/root';
import { useTranslation } from 'react-i18next';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './App.scss';

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
      <div id="dynamic-portals" />
    </>
  );
}

export const WrappedMain = connect()(Main);
export default hot(App);
