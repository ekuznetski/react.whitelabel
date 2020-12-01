import { localesConfig, routesInitialApiData, routesNavConfig, routesRedirectConfig } from '@domain';
import { ELanguage } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { ac_fetchContent, ac_updateRouteParams, EActionTypes, IAppStore, IStore, store } from '@store';
import { useLockScroll, usePathLocale } from '@utils/hooks';
import { useBoolean, useThrottleEffect } from 'ahooks';
import React, { memo, useEffect } from 'react';
import { batch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { NotFound, PageLoader } from '..';

export const Router = memo(function Router() {
  const { routeState } = useSelector<IStore, { routeState: IAppStore['route'] }>((state) => ({
    routeState: state.app.route,
  }));
  const { localizePath, delocalizePath } = usePathLocale();
  const { pathname, state } = useLocation();

  useEffect(() => {
    const _path = delocalizePath(pathname);
    const _locale = pathname.split('/')[1] as ELanguage;

    if (routeState.path != _path && localesConfig.includes(_locale)) {
      const route = routesNavConfig.find((route) => route.path === _path);
      window.scrollTo(0, 0);
      store.dispatch(
        ac_updateRouteParams({
          path: route?.path,
          appSection: route?.appSection,
          meta: route?.meta,
          state: Object.assign({}, state, route?.state),
          isLoading: true,
        }),
      );
    }
  }, [pathname]);

  return (
    <>
      <PageLoader isLoading={routeState.isLoading} />
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
            render={() => <RenderRoute route={route} routeState={routeState} />}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </>
  );
});

interface IRenderRoute {
  route: IRouteNavConfig;
  routeState: IAppStore['route'];
}

function RenderRoute({ route, routeState }: IRenderRoute) {
  const { openedRequests } = useSelector<IStore, { openedRequests: EActionTypes[] }>((state) => ({
    openedRequests: state.app.requests.activeList,
  }));
  const [firstRender, { setFalse: setFirstRender }] = useBoolean(true);
  // const [isLoading, { setFalse: setIsLoading }] = useBoolean(true);
  const { localizePath } = usePathLocale();
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
      // console.log('Request Initial Action: ' + _ac.type);
      _batchDispatch.push(_ac);
    });

    // Request Page ApiData
    [...(route.apiData?.lazy || []), ...(route.apiData?.strict || [])]?.forEach((ac) => {
      const _ac = ac();
      // console.log('Request Page Action: ' + _ac.type);
      _batchDispatch.push(_ac);
    });

    batch(() => {
      _batchDispatch.forEach((action) => store.dispatch(action));
    });

    useLockScroll(true);
    setFirstRender();

    return () => {
      store.dispatch(ac_updateRouteParams({ isLoading: true }));
    };
  }, [firstRender]);

  useThrottleEffect(
    () => {
      if (!firstRender) {
        const _routeStrictRequests = [
          ...(route.apiData?.strict || []),
          ...(routesInitialApiData[route.appSection]?.strict || []),
        ].map((action) => action().type);
        const hasUncompletedStrictRequest = _routeStrictRequests.length
          ? openedRequests.filter((request) => _routeStrictRequests.includes(request)).length > 0
          : false;

        useLockScroll(hasUncompletedStrictRequest);
        store.dispatch(ac_updateRouteParams({ isLoading: hasUncompletedStrictRequest }));

        if (route.activators && !hasUncompletedStrictRequest) {
          const _redirectParams = route.activators
            .map((activator) => activator())
            .find((a) => !a || Object.keys(a).length);

          if (typeof _redirectParams === 'object') {
            history.push(localizePath(_redirectParams.path), _redirectParams?.state);
          } else if (_redirectParams === false) {
            history.push(localizePath(routeState.path));
          }
        }
      }
    },
    [openedRequests],
    { wait: 100 },
  );

  return !firstRender && !routeState.isLoading && route.component ? <route.component /> : null;
}
