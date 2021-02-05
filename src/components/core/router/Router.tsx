import { localesConfig } from '@domain';
import { EAppSection, ELanguage, EPagePath } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { routesInitialApiData, routesNavConfig, routesRedirectConfig } from '@routers';
import { EActionTypes, IAppStore, IStore, ac_updateRouteParams, ignoreActionIfPageLoadedList, store } from '@store';
import { routeFetchData } from '@utils/fn/routeFetchData';
import { useMeta, usePathLocale } from '@utils/hooks';
import { useCreation, usePrevious, useThrottle, useThrottleEffect, useTitle } from 'ahooks';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Header, PageLoader } from '..';

interface IRenderState {
  routeState: IAppStore['route'];
  requests: {
    activeList: EActionTypes[];
    failedList: EActionTypes[];
  };
}

export const Router = memo(function Router() {
  const { routeState, requests } = useSelector<IStore, IRenderState>((state) => ({
    requests: state.app.requests,
    routeState: state.app.route,
  }));
  const { localizePath, delocalizePath } = usePathLocale();
  const { pathname, state } = useLocation();
  const history = useHistory();

  const _path = delocalizePath(pathname);

  // If the locale is not supported by current LABEL, reset it
  let _locale = pathname.split('/')[1] as ELanguage;
  if (!localesConfig.includes(_locale)) {
    _locale = ELanguage.en;
  }

  let _route = routesNavConfig.find((route) => route.path === _path);
  useMeta({ name: 'description', content: _route?.meta?.desc || '' });
  useTitle(_route?.meta?.title || '');

  useEffect(() => {
    if (routeState.path != _path || (!routeState.path && !_path)) {
      routeState.prev = undefined;
      window.scrollTo(0, 0);
      store.dispatch(
        ac_updateRouteParams({
          path: _route?.path,
          appSection: _route?.appSection,
          meta: _route?.meta,
          state: Object.assign({}, state, _route?.state),
          isLoading: !!_route,
          redirectTo: undefined,
          prev: routeState,
        }),
      );

      if (_route) {
        routeFetchData(_route);
      }
    }
  }, [pathname]);

  useThrottleEffect(
    () => {
      if (_route?.appSection === EAppSection.portal) {
        if (failedOnAction([EActionTypes.fetchProfile, EActionTypes.fetchClientData])) {
          store.dispatch(ac_updateRouteParams({ redirectTo: EPagePath.Logout }));
        }
      }
    },
    [requests.failedList],
    { wait: 50 },
  );

  useThrottleEffect(
    () => {
      if (_route) {
        const _routeStrictRequests = [
          ...(_route.apiData?.strict || []),
          ...(routesInitialApiData[_route.appSection]?.strict || []),
        ].map((action) => action().type);
        const hasUncompletedStrictRequest = _routeStrictRequests.length
          ? requests.activeList.filter((request) => _routeStrictRequests.includes(request)).length > 0 &&
            !(!routeState.isLoading && ignoreOnAction(ignoreActionIfPageLoadedList))
          : false;

        if (routeState.isLoading != hasUncompletedStrictRequest) {
          // console.log('useThrottleEffect', routeState.isLoading, hasUncompletedStrictRequest);
          store.dispatch(ac_updateRouteParams({ isLoading: hasUncompletedStrictRequest }));
        }

        if (_route.activators && !hasUncompletedStrictRequest) {
          const _redirectParams = _route.activators
            .map((activator) => activator({ route: _route, routeState, history }))
            .find((a) => !a || Object.keys(a).length);

          if (typeof _redirectParams === 'object') {
            history.push(localizePath(_redirectParams.path), _redirectParams?.state);
          } else if (_redirectParams === false) {
            history.push(localizePath(_route.path));
          }
        }
      }
    },
    [requests.activeList],
    { wait: 50 },
  );

  function failedOnAction(actions: EActionTypes[]) {
    return actions.some((request) => requests.failedList.indexOf(request) != -1);
  }

  function ignoreOnAction(actions: EActionTypes[]) {
    return actions.some((request) => requests.activeList.indexOf(request) != -1);
  }

  return (
    <>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        {/* {_path.length > 1 && _route && <Redirect from={_path} to={localizePath(_path)} />} */}
        {routeState.redirectTo && <Redirect to={localizePath(routeState.redirectTo)} />}
        {routeState.locale && <Redirect exact from="/" to={routeState.locale} />}
        {routesRedirectConfig.map((route) => (
          <Redirect key={route.path} exact from={route.path} to={route.redirectTo} />
        ))}
        {routesNavConfig.map((route) => (
          <Route
            key={route.path}
            exact
            path={
              _route?.appSection === EAppSection.general
                ? [localizePath(route.path), route.path]
                : localizePath(route.path)
            }
            render={() => {
              // if new route and current route are different, means the page is loading 😁
              return <RenderRoute component={route.component} />;
            }}
          />
        ))}
        <Redirect to="404" />
      </Switch>
    </>
  );
});

function RenderRoute(props: { component: IRouteNavConfig['component'] }) {
  const { routeState, requests } = useSelector<IStore, IRenderState>((state) => ({
    requests: state.app.requests,
    routeState: state.app.route,
  }));
  const _prevActiveList = usePrevious(requests.activeList);
  const _isLoading = useThrottle(
    !(
      Array.isArray(_prevActiveList) &&
      Array.isArray(requests.activeList) &&
      _prevActiveList.length == 0 &&
      requests.activeList.length == 0
    ) || routeState.isLoading,
    { wait: 200 },
  ); // delay the loading effect to disappear

  return useCreation(() => {
    return (
      <>
        <PageLoader isLoading={_isLoading} />
        {!_isLoading && props.component ? (
          <>
            <Header />
            <main className="router-context">
              <props.component />
            </main>
          </>
        ) : null}
      </>
    );
  }, [_isLoading]);
}
