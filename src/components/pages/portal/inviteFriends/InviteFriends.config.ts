import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

export const config = {
  avatarImages: [
    'share-avatar-1.png',
    'share-avatar-2.png',
    'share-avatar-1.png',
    'share-avatar-2.png',
    'share-avatar-1.png',
    'share-avatar-2.png',
  ],
  socialNetworks: [
    {
      component: FacebookShareButton,
      icon: 'facebook',
    },
    {
      component: TwitterShareButton,
      icon: 'twitter',
    },
    {
      component: LinkedinShareButton,
      icon: 'linkedin',
    },
  ],
};
