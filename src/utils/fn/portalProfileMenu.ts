import { profileMenuPortalConfig } from '@domain';
import { EPagePath } from '@domain/enums';
import { store } from '@store';

export function portalProfileMenu() {
  const state = store.getState();

  if (!state.data.client.settings.allow_raf) {
    return profileMenuPortalConfig.filter((el) => el.path !== EPagePath.InviteFriends);
  }

  return profileMenuPortalConfig;
}
