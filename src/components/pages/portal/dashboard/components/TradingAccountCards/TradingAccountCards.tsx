import React from 'react';
import { ETradingType } from '@domain/enums';
import { IStore } from '@store';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDeviceDetect } from '@utils/hooks';
import { TradingAccountAddCard } from './AddCard/TradingAccountAddCard';
import { ITradingAccountSingleCard, TradingAccountSingleCard } from './SingleCard/TradingAccountSingleCard';
import { TradingAccountsProvider } from './trading-accounts.context';
import './TradingAccountCards.scss';

export function TradingAccountCards(props: { type: ETradingType[] }) {
  const { tradingAccountCards } = useSelector<IStore, { tradingAccountCards: ITradingAccountSingleCard[] }>(
    (state) => ({
      tradingAccountCards: state.data.tradingData.accounts
        .filter((account) => props.type.includes(account.type))
        .map((account) => ({
          platform: account.platform,
          tradingAccountType: account.accountType,
          allowLeverageChange: account.allowLeverageChange,
          type: account.type,
          balance: account.balance,
          accountId: account.accountId,
          leverage: account.leverage,
          currency: account.currency,
        })),
    }),
  );
  const { isMobile } = useDeviceDetect();
  const inlineView = tradingAccountCards.length >= 3 && !isMobile;

  return (
    <TradingAccountsProvider>
      {() => (
        <div className="trading-account-cards">
          <Row>
            {tradingAccountCards.map((cardContext, cc) => (
              <TradingAccountSingleCard key={cc} {...cardContext} inline={inlineView} />
            ))}
            {tradingAccountCards.length < 10 && <TradingAccountAddCard type={props.type} inline={inlineView} />}
          </Row>
        </div>
      )}
    </TradingAccountsProvider>
  );
}
