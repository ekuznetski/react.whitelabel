import { env } from '@domain';
import { ELabels } from '@domain/enums';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { IIntercomChatParams, IntercomChatAppId } from './intercomChat.context';

export const IntercomChat = memo(function IntercomChat() {
  const targetLabel: keyof typeof ELabels = env.LABEL?.toLowerCase() || 'default';
  const { clientInfo } = useSelector<IStore, { clientInfo: MClientProfile }>((state) => ({
    clientInfo: state.data.client.profile,
  }));

  // const onHide = () => console.log('Intercom did hide the Messenger');
  const onHide = React.useCallback(() => console.log('Intercom did hide the Messenger'), []);
  const onShow = React.useCallback(() => console.log('Intercom did show the Messenger'), []);

  return (
    <IntercomProvider appId={IntercomChatAppId[targetLabel]} onHide={onHide} onShow={onShow} autoBoot>
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
        userId: clientInfo.ic_hash,
      });
    } else {
      shutdown();
      boot();
    }
  }, [clientInfo]);

  // const bootWithProps = () => boot({ name: 'Russo' });
  // const bootWithProps = React.useCallback(() => boot({ name: 'Russo' }), [boot]);

  return <></>;
});
