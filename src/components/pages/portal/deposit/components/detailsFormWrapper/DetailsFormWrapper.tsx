import React, { useContext } from 'react';
import { EDepositMethods } from '@domain/enums';
import { DepositContext } from '../../depositContext';
import { NetellerMethod, CardMethod, SkrillMethod, WebmoneyMethod } from '..';

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
