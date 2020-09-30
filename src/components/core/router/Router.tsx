import { routesInitialApiData, routesNavConfig, routesRedirectConfig } from '@domain';
import { IRouteNavConfig } from '@domain/interfaces';
import { ac_fetchContent, ac_updateRouteParams, EActionTypes, IStore, store } from '@store';
import { useThrottle } from 'ahooks';
import React, { memo, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useLockScroll } from 'utils/hooks/useLockScroll';
import { PageLoader } from '..';
import { EAppSection } from '@domain/enums';

export const Router = memo(function Router() {
  const dispatch = useDispatch();
  const { currentRoute, activeRequestsList } = useSelector<IStore, any>((state) => ({
    currentRoute: state.app.route.current,
    activeRequestsList: state.app.requests.activeList,
  }));
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentRoute != location.pathname) {
      window.scrollTo(0, 0);
      dispatch(
        ac_updateRouteParams({
          current: location.pathname,
          appSection: routesNavConfig.find((route) => route.path === location.pathname)?.appSection as EAppSection,
        }),
      );
    }
  }, [pathname]);

  return (
    <Switch>
      {routesRedirectConfig.map((route) => (
        <Redirect key={route.path} exact from={route.path} to={route.redirectTo} />
      ))}
      {routesNavConfig.map((route, r) => (
        <Route
          key={r}
          exact
          path={route.path}
          render={() => <RenderRoute route={route} prevPath={currentRoute} openedRequests={activeRequestsList} />}
        />
      ))}
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
  const history = useHistory();

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
      ...(routesInitialApiData[route.appSection]?.lazy || []),
      ...(routesInitialApiData[route.appSection]?.strict || []),
    ]?.forEach((ac) => {
      const _ac = ac();
      console.log('Request Initial Action: ' + _ac.type);
      _batchDispatch.push(_ac);
    });

    // Request Page ApiData
    [...(route.apiData?.lazy || []), ...(route.apiData?.strict || [])]?.forEach((ac) => {
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
      const _routeStrictRequests = [
        ...(route.apiData?.strict || []),
        ...(routesInitialApiData[route.appSection]?.strict || []),
      ].map((action) => action().type);
      const hasUncompletedStrictRequest = _routeStrictRequests.length
        ? openedRequests.filter((request) => _routeStrictRequests.includes(request)).length > 0
        : false;

      useLockScroll(hasUncompletedStrictRequest, route.appSection);
      setRouteLoading(hasUncompletedStrictRequest);

      if (route.activators && !hasUncompletedStrictRequest) {
        const _redirectParams = route.activators
          .map((activator) => activator())
          .find((a) => !a || Object.keys(a).length);

        if (typeof _redirectParams === 'object') {
          history.push(_redirectParams.path, _redirectParams?.state)
        } else if (_redirectParams === false) {
          history.push(prevPath);
        }
      }
    }
  }, [_openedRequests]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      {!isLoading && <route.component routeState={route.state} />}
    </>
  );
}
