import { IStore } from '@store';
import React from 'react';
import { useSelector } from 'react-redux';
import { ITradingAccountSingleCard, TradingAccountSingleCard } from './SingleCard/TradingAccountSingleCard';
import { ETradingType } from '@domain/enums';
import './TradingAccountCards.scss';
import { Row } from 'react-bootstrap';
import { TradingAccountAddCard } from './AddCard/TradingAccountAddCard';

export function TradingAccountCards(props: { type: ETradingType }) {
  const { tradingAccountCards } = useSelector<IStore, { tradingAccountCards: ITradingAccountSingleCard[] }>(
    (state) => ({
      tradingAccountCards: state.data.tradingData.accounts
        .filter((account) => account.type === props.type)
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
