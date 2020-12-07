import { EDepositMethods } from '@domain/enums';
import React, { useContext } from 'react';
import { CardMethod, NetellerMethod, SkrillMethod, WebmoneyMethod } from '..';
import { DepositContext } from '../../deposit.context';

export function DetailsFormWrapper() {
  const { method } = useContext(DepositContext).state;
  const detailsFormComponents: { [k: string]: JSX.Element } = {
    [EDepositMethods.creditCard]: <CardMethod />,
    [EDepositMethods.neteller]: <NetellerMethod />,
    [EDepositMethods.webmoney]: <WebmoneyMethod />,
    [EDepositMethods.skrill]: <SkrillMethod />,
  };
  return method ? detailsFormComponents[method] : null;
}
