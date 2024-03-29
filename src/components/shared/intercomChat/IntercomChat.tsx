import { env } from '@env';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { IIntercomChatParams } from './intercomChat.interface';

export const IntercomChat = memo(function IntercomChat(props: { children: React.ReactElement }) {
  if (!env.PRODUCTION || !env.INTERCOM_ID) {
    return (
      <IntercomProvider appId={env.INTERCOM_ID} shouldInitialize={false}>
        {props.children}
      </IntercomProvider>
    );
  }

  const { clientProfile, locale } = useSelector<IStore, { clientProfile: MClientProfile; locale: string }>((state) => ({
    clientProfile: state.data.client.profile,
    locale: state.app.route.locale,
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
        approved: clientProfile.aprv.toString(),
        language: locale,
      }
    : { language: locale };

  return (
    <IntercomProvider appId={env.INTERCOM_ID}>
      {props.children}
      <Chat userInfo={userInfo} />
    </IntercomProvider>
  );
});

export const Chat = memo(function Chat({ userInfo }: IIntercomChatParams) {
  const { boot, update, hardShutdown } = useIntercom();

  useEffect(() => {
    if (userInfo?.email) {
      update(userInfo);
    } else {
      hardShutdown();
      boot();
    }
  }, [userInfo?.email]);

  return null;
});
