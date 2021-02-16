import { EPagePath, EWebSocketMessage, MarketType } from '@domain/enums';
import { IAppStore, IStore, ac_savePrices } from '@store';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from 'socket.io-client';

const io = socket({
  path: 'ws',
});

export const WebSocketListener = memo(function WebSocketListener() {
  const { route } = useSelector<IStore, { route: IAppStore['route'] }>((state) => ({
    route: state.app.route,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    io.on(EWebSocketMessage.prices, (pricesData: any) => {
      if ([EPagePath.Home, EPagePath.Products].includes(route.path))
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
