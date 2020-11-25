import { env } from '@domain';
import { ELabels } from '@domain/enums';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { IIntercomChatParams, IntercomChatAppId } from './intercomChat.context';

export const IntercomChat = memo(function IntercomChat() {
  const { clientInfo } = useSelector<IStore, { clientInfo: MClientProfile }>((state) => ({
    clientInfo: state.data.client.profile,
  }));

  const targetLabel: keyof typeof ELabels = env.LABEL?.toLowerCase() || 'default';

  const onHide = React.useCallback(() => console.log('Messenger now hiden'), []);
  const onShow = React.useCallback(() => console.log('Messenger now shown'), []);

  return (
    <IntercomProvider appId={IntercomChatAppId[targetLabel]} onHide={onHide} onShow={onShow}>
      <Chat {...clientInfo} />
    </IntercomProvider>
  );
});

export const Chat = memo<IIntercomChatParams>(function Chat(clientInfo) {
  const { boot, update, shutdown } = useIntercom();

  useEffect(() => {
    if (clientInfo.first_name) {
      update({
        ...clientInfo,
        name: `${clientInfo.first_name} ${clientInfo.last_name}`,
        phone: clientInfo.phone?.toString(),
      });
    }
    return () => {
      //clear data
      shutdown();
      boot();
    };
  }, [clientInfo]);

  return <></>;
});
