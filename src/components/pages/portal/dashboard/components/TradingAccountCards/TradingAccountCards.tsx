import { ETradingType } from '@domain/enums';
import { IStore } from '@store';
import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { TradingAccountAddCard } from './AddCard/TradingAccountAddCard';
import { ITradingAccountSingleCard, TradingAccountSingleCard } from './SingleCard/TradingAccountSingleCard';
import './TradingAccountCards.scss';

export function TradingAccountCards(props: { type: ETradingType[] }) {
  const { tradingAccountCards } = useSelector<IStore, { tradingAccountCards: ITradingAccountSingleCard[] }>(
    (state) => ({
      tradingAccountCards: state.data.tradingData.accounts
        .filter((account) => props.type.includes(account.type))
        .map((account) => ({
          platform: account.platformName,
          type: account.accountType,
          balance: account.balance,
          accountId: account.accountId,
          leverage: account.leverage,
          currency: account.currency,
        })),
    }),
  );
  const inlineView = tradingAccountCards.length >= 3;

  return (
    <div className="trading-account-cards">
      <Row>
        {tradingAccountCards.map((cardContext, cc) => (
          <TradingAccountSingleCard key={cc} {...cardContext} inline={inlineView} />
        ))}
        {tradingAccountCards.length < 10 && <TradingAccountAddCard type={props.type} inline={inlineView} />}
      </Row>
    </div>
  );
}
