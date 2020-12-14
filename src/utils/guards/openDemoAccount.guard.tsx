import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function openDemoAccountGuard(): IRouteGuard {
  return store.getState().data.client.settings.allow_additional_demo_account;
}
