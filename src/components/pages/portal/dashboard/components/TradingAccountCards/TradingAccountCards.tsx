import React from 'react';
import { ETradingType } from '@domain/enums';
import { IStore } from '@store';
import { Row } from '@components/shared';
import { useSelector } from 'react-redux';
import { TradingAccountAddCard } from './AddCard/TradingAccountAddCard';
import { ITradingAccountSingleCard, TradingAccountSingleCard } from './SingleCard/TradingAccountSingleCard';
import { TradingAccountsProvider } from './trading-accounts.context';
import { MClientSettings } from '@domain/models';
import './TradingAccountCards.scss';
import { useResponsive } from 'ahooks';

export function TradingAccountCards(props: { type: ETradingType[] }) {
  const { tradingAccountCards, clientSettings } = useSelector<
    IStore,
    { tradingAccountCards: ITradingAccountSingleCard[]; clientSettings: MClientSettings }
  >((state) => ({
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
    clientSettings: state.data.client.settings,
  }));
  const responsive = useResponsive();
  const inlineView = tradingAccountCards.length >= 3 && responsive.md;
  const allowAddCard =
    (props.type.includes(ETradingType.demo) && clientSettings.allow_additional_demo_account) ||
    (props.type.includes(ETradingType.live) && clientSettings.allow_additional_live_account);

  return (
    <TradingAccountsProvider>
      {() => (
        <div className="trading-account-cards">
          <Row>
            {tradingAccountCards.map((cardContext, cc) => (
              <TradingAccountSingleCard key={cc} {...cardContext} inline={inlineView} />
            ))}
            {allowAddCard && tradingAccountCards.length < 10 && (
              <TradingAccountAddCard type={props.type} inline={inlineView} />
            )}
          </Row>
        </div>
      )}
    </TradingAccountsProvider>
  );
}
