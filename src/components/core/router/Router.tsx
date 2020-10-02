import { localesConfig, routesInitialApiData, routesNavConfig, routesRedirectConfig } from '@domain';
import { ELanguage } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { ac_fetchContent, ac_updateRouteParams, EActionTypes, IAppStore, IStore, store } from '@store';
import { usePathLocale } from '@utils/hooks';
import { useThrottle } from 'ahooks';
import { locale } from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useLockScroll } from 'utils/hooks/useLockScroll';
import { NotFound, PageLoader } from '..';

export const Router = memo(function Router() {
  const { routeState, activeRequestsList } = useSelector<
    IStore,
    { routeState: IAppStore['route']; activeRequestsList: EActionTypes[] }
  >((state) => ({
    routeState: state.app.route,
    activeRequestsList: state.app.requests.activeList,
  }));
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { localizePath, delocalizePath } = usePathLocale();

  useEffect(() => {
    const _path = delocalizePath(pathname);
    const _locale = pathname.split('/')[1] as ELanguage;

    if (routeState.path != _path && localesConfig.includes(_locale)) {
      const route = routesNavConfig.find((route) => route.path === _path);

      window.scrollTo(0, 0);
      dispatch(
        ac_updateRouteParams({
          path: route?.path,
          appSection: route?.appSection,
          meta: route?.meta,
        }),
      );
    }
  }, [pathname]);

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      {routeState.locale && <Redirect exact from="/" to={routeState.locale} />}
      {routesRedirectConfig.map((route) => (
        <Redirect key={route.path} exact from={route.path} to={route.redirectTo} />
      ))}
      {routesNavConfig.map((route, r) => (
        <Route
          key={r}
          exact
          path={localizePath(route.path)}
          render={() => <RenderRoute route={route} prevPath={routeState.path} openedRequests={activeRequestsList} />}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
});

interface IRenderRoute {
  route: IRouteNavConfig;
  prevPath: string;
  openedRequests: EActionTypes[];
}

function RenderRoute({ route, prevPath, openedRequests }: IRenderRoute) {
  const [renderCounter, setCounter] = useState(0);
  const [isLoading, setRouteLoading] = useState(true);
  const _openedRequests = useThrottle(openedRequests, { wait: 200 });

  useEffect(() => {
    const _batchDispatch: any[] = [];

    // Request Page Content
    const urlReducer: string[] = []; // Reduce path depth (the parent path will be send to translation req)
    const urlProxy: { [key: string]: string } = {}; // Replace left side to right side and send to translation req
    const url = route.path.split('/').reduce((acc: string[], el) => {
      if (!urlReducer.includes(el)) acc.push(el);
      if (urlProxy[el]) acc.push(urlProxy[el]);
      return acc;
    }, []);

    const page = url.slice(-1).toString() || 'main';
    _batchDispatch.push(ac_fetchContent({ page }));

    // Request Initial ApiData
    [
      ...(routesInitialApiData[route.appSection]?.optional || []),
      ...(routesInitialApiData[route.appSection]?.required || []),
    ]?.forEach((ac) => {
      const _ac = ac();
      console.log('Request Initial Action: ' + _ac.type);
      _batchDispatch.push(_ac);
    });

    // Request Page ApiData
    [...(route.apiData?.optional || []), ...(route.apiData?.required || [])]?.forEach((ac) => {
      const _ac = ac();
      console.log('Request Page Action: ' + _ac.type);
      _batchDispatch.push(_ac);
    });

    useLockScroll(true, route.appSection);

    batch(() => {
      _batchDispatch.forEach((action) => store.dispatch(action));
    });
    setCounter(renderCounter + 1);
  }, []);

  useEffect(() => {
    if (renderCounter) {
      const _routeRequiredRequests = [
        ...(route.apiData?.required || []),
        ...(routesInitialApiData[route.appSection]?.required || []),
      ].map((action) => action().type);
      const hasUncompletedRequiredRequest = _routeRequiredRequests.length
        ? openedRequests.filter((request) => _routeRequiredRequests.includes(request)).length > 0
        : false;

      useLockScroll(hasUncompletedRequiredRequest, route.appSection);
      setRouteLoading(hasUncompletedRequiredRequest);
    }
  }, [_openedRequests]);

  if (route.activators) {
    const _redirectParams = route.activators.map((activator) => activator()).find((a) => !a || Object.keys(a).length);

    if (typeof _redirectParams === 'object') {
      return <Redirect to={_redirectParams} />;
    } else if (_redirectParams === false) {
      return <Redirect to={prevPath} />;
    }
  }

  return (
    <>
      <PageLoader isLoading={isLoading} />
      {!isLoading && <route.component routeState={route.state} />}
    </>
  );
}
