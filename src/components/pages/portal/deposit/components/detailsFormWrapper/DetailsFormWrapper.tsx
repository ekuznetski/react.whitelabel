import { EDepositMethodCode } from '@domain/enums';
import React, { useContext } from 'react';
import { CardMethod, NetellerMethod, SkrillMethod, WebmoneyMethod } from '..';
import { DepositContext } from '../../deposit.context';

export function DetailsFormWrapper() {
  const { method } = useContext(DepositContext).state;
  const detailsFormComponents: { [k: string]: JSX.Element } = {
    [EDepositMethodCode.creditCard]: <CardMethod />,
    [EDepositMethodCode.neteller]: <NetellerMethod />,
    [EDepositMethodCode.webmoney]: <WebmoneyMethod />,
    [EDepositMethodCode.skrill]: <SkrillMethod />,
  };
  return method ? detailsFormComponents[method] : null;
}
