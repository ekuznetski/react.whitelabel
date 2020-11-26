import { env } from '@domain';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import React, { forwardRef, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { IIntercomChatParams } from './intercomChat.interface';

export const IntercomChat = memo(function IntercomChat() {
  const { clientProfile } = useSelector<IStore, { clientProfile: MClientProfile }>((state) => ({
    clientProfile: state.data.client.profile,
  }));

  const userInfo = clientProfile
    ? {
        email: clientProfile.email,
        name: `${clientProfile.first_name}  ${clientProfile.last_name}`,
        phone: `${clientProfile.phone_prefix} ${clientProfile.phone}`,
        country: clientProfile.country,
        currency: clientProfile.curr,
        accountType: clientProfile.account_type,
        manager: clientProfile.manager,
        userHash: clientProfile.ic_hash,
        userId: clientProfile.userId,
        salesforce: 'https://eu1.salesforce.com/' + clientProfile.sfid,
        deposit: clientProfile.ftd.toString(),
        jurisdiction: clientProfile.jurisdiction,
        approved: clientProfile.aprv.toString(),
      }
    : undefined;

  function onHide() {
    console.log('Messenger now hiden');
  }
  function onShow() {
    console.log('Messenger now shown');
  }

  return (
    <IntercomProvider appId={env.INTERCOM_CHAT_APP_ID} onHide={onHide} onShow={onShow}>
      <Chat userInfo={userInfo} />
    </IntercomProvider>
  );
});

export const Chat = memo(
  forwardRef<HTMLDivElement, IIntercomChatParams>(function Chat({ userInfo }, ref) {
    const { boot, update, shutdown } = useIntercom();

    useEffect(() => {
      if (userInfo) {
        update(userInfo);
      }
      return () => {
        //clear data if logged out
        if (!userInfo) {
          shutdown();
          boot();
        }
      };
    }, [userInfo]);

    return null;
  }),
);
