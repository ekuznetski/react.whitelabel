import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function internalTransfersGuard(): IRouteGuard {
  return store.getState().data.client.settings.allow_internal_transfer;
}
