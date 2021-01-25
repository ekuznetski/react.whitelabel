import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function withdrawGuard(): IRouteGuard {
  return !!store.getState().data.client?.settings.allow_withdrawal;
}
