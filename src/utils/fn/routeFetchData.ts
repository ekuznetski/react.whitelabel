import { IRouteNavConfig } from '@domain/interfaces';
import { routesInitialApiData } from '@routers';
import { store } from '@store';
import { batch } from 'react-redux';

export function routeFetchData(route: IRouteNavConfig) {
  const _batchDispatch: any[] = [];
  [
    ...(routesInitialApiData[route.appSection]?.lazy || []),
    ...(routesInitialApiData[route.appSection]?.strict || []),
  ]?.forEach((ac) => {
    const _ac = ac();
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
}
