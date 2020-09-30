import React, { useContext } from 'react';
import { EDepositMethods } from '@domain/enums';
import { CardMethod } from '..';
import { DepositContext } from '../../depositContext';
import { NetellerMethod } from '..';
import { SkrillMethod } from '..';

export function DetailsFormWrapper() {
  const { method } = useContext(DepositContext).state;
  let detailsFormComponent: React.ReactNode;
  switch (method) {
    case EDepositMethods.creditCard:
      detailsFormComponent = <CardMethod />;
      break;
    case EDepositMethods.netteller:
      detailsFormComponent = <NetellerMethod />;
      break;
    case EDepositMethods.skrill:
      detailsFormComponent = <SkrillMethod />;
      break;
  }
  return <>{detailsFormComponent}</>;
}
