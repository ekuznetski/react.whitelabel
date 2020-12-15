import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function openLiveAccountGuard(): IRouteGuard {
  return store.getState().data.client.settings.allow_additional_live_account;
}
