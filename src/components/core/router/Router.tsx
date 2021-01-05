import { localesConfig } from '@domain';
import { EAppSection, ELanguage, EPagePath } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { routesInitialApiData, routesNavConfig, routesRedirectConfig } from '@routers';
import { EActionTypes, IAppStore, IStore, ac_updateRouteParams, store } from '@store';
import { routeFetchData } from '@utils/fn';
import { useLockScroll, useMeta, usePathLocale } from '@utils/hooks';
import { useBoolean, useThrottle, useThrottleEffect, useTitle } from 'ahooks';
import React, { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, PageLoader } from '..';

export const Router = memo(function Router() {
  const { routeState, failedRequests } = useSelector<
    IStore,
    { routeState: IAppStore['route']; failedRequests: EActionTypes[] }
  >((state) => ({
    failedRequests: state.app.requests.failedList,
    routeState: state.app.route,
  }));
  const { localizePath, delocalizePath } = usePathLocale();
  const { pathname, state } = useLocation();
  const _isLoading = useThrottle(!routeState || routeState.isLoading, { wait: 50 });
  const _path = delocalizePath(pathname);
  let _locale = pathname.split('/')[1] as ELanguage;

  if (!localesConfig.includes(_locale)) {
    _locale = ELanguage.en;
  }

  let _route = routesNavConfig.find((route) => route.path === _path);
  useMeta({ name: 'description', content: _route?.meta?.desc || '' });
  useTitle(_route?.meta?.title || '');

  useEffect(() => {
    if (routeState.path != _path || (!routeState.path && !_path)) {
      window.scrollTo(0, 0);
      store.dispatch(
        ac_updateRouteParams({
          path: _route?.path,
          appSection: _route?.appSection,
          meta: _route?.meta,
          state: Object.assign({}, state, _route?.state),
          isLoading: !!_route,
          redirectTo: undefined,
        }),
      );
    }
  }, [pathname]);

  useEffect(() => {
    if (_route) {
      const failedOnAction = (arr1: EActionTypes[]) => {
        return arr1.some((r) => failedRequests.indexOf(r) >= 0);
      };

      if (_route.appSection === EAppSection.portal) {
        if (failedOnAction([EActionTypes.fetchProfile, EActionTypes.fetchClientData])) {
          store.dispatch(ac_updateRouteParams({ redirectTo: EPagePath.Logout }));
        }
      }
    }
  }, [failedRequests]);

  return useMemo(() => {
    return (
      <>
        <PageLoader isLoading={_isLoading} />
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          {/* {_path.length > 1 && _route && <Redirect from={_path} to={localizePath(_path)} />} */}
          {routeState.redirectTo && <Redirect to={localizePath(routeState.redirectTo)} />}
          {routeState.locale && <Redirect exact from="/" to={routeState.locale} />}
          {routesRedirectConfig.map((route) => (
            <Redirect key={route.path} exact from={route.path} to={route.redirectTo} />
          ))}
          {routesNavConfig.map((route, r) => (
            <Route
              key={r}
              exact
              path={
                _route?.appSection === EAppSection.general
                  ? [localizePath(route.path), route.path]
                  : localizePath(route.path)
              }
              render={() => <RenderRoute route={route} routeState={routeState} />}
            />
          ))}
          <Redirect to="404" />
        </Switch>
      </>
    );
  }, [_isLoading, routeState.path == _route?.path]);
});

interface IRenderRoute {
  route: IRouteNavConfig;
  routeState: IAppStore['route'];
}

function RenderRoute({ route, routeState }: IRenderRoute) {
  const { openedRequests } = useSelector<IStore, { openedRequests: EActionTypes[] }>((state) => ({
    openedRequests: state.app.requests.activeList,
  }));
  const [firstRender, { setFalse: setFirstRenderFalse }] = useBoolean(true);
  const [pageLoaded, { setTrue: setPageLoaded }] = useBoolean(false);
  const { localizePath } = usePathLocale();
  const history = useHistory();

  useEffect(() => {
    routeFetchData(route);
    useLockScroll(true);
    setFirstRenderFalse();
  }, [route]);

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

        useLockScroll(!pageLoaded && hasUncompletedStrictRequest);
        if (routeState.isLoading != hasUncompletedStrictRequest && !pageLoaded) {
          store.dispatch(ac_updateRouteParams({ isLoading: hasUncompletedStrictRequest }));
        }

        if (route.activators && !hasUncompletedStrictRequest) {
          const _redirectParams = route.activators
            .map((activator) => activator(history.location))
            .find((a) => !a || Object.keys(a).length);

          if (typeof _redirectParams === 'object') {
            history.push(localizePath(_redirectParams.path), _redirectParams?.state);
          } else if (_redirectParams === false) {
            history.push(localizePath(route.path));
          }

          setPageLoaded();
        }
      }
    },
    [openedRequests],
    { wait: 25 }, // this value will effect the time the page loader displayed
  );

  return !firstRender && !routeState.isLoading && route.component ? (
    <>
      <Header />
      <main className="router-context">
        <route.component />
      </main>
    </>
  ) : null;
}
