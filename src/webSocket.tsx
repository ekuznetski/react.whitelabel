import { EWebSocketMessage, MarketType } from '@domain/enums';
import { ac_savePrices } from '@store';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from 'socket.io-client';

const io = socket();

export const WebSocketListener = memo(function WebSocketListener() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    io.on(EWebSocketMessage.prices, (pricesData: any) => {
      dispatch(
        ac_savePrices(
          Object.keys(pricesData).reduce((acc, e) => {
            Object.assign(acc, { [e.toLowerCase() as keyof typeof MarketType]: pricesData[e] });
            return acc;
          }, {}),
        ),
      );
    });
  });

  return null;
});
