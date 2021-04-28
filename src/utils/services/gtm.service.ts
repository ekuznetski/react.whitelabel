import { store } from '@store';
import TagManager from 'react-gtm-module';

export function TagManagerUserEvent() {
  const profile = store.getState().data.client.profile;

  console.log(profile);

  TagManager.dataLayer({
    dataLayer: {
      event: 'user',
      name: profile.full_name,
      email: profile.email,
      userId: profile.userId,
    },
  });
}
