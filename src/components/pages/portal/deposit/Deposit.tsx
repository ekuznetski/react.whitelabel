import { PageTitle, Tab, Tabs } from '@components/shared';
import { AllowedCurrToMethodMap, ECurrencyCode, EDepositMethods } from '@domain/enums';
import { env } from '@env';
import { IAppStore, IStore } from '@store';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DetailsFormWrapper, TabContentBankWire, TabContentChooseAmount } from './components';
import { depositActionCreators, DepositProvider, IDepositAction, IDepositState } from './deposit.context';
import './Deposit.scss';
import { DepositSuccessFailure } from './depositSuccessFailure/DepositSuccessFailure';

export const Deposit = memo(function Deposit() {
  const { route, tradingAccountsCurrencies } = useSelector<
    IStore,
    { tradingAccountsCurrencies: ECurrencyCode[] } & Pick<IAppStore, 'route'>
  >((state) => ({
    route: state.app.route,
    tradingAccountsCurrencies: Array.from(
      state.data.tradingData.accounts.reduce(
        (currencies, account) => currencies.add(account.currency),
        new Set<ECurrencyCode>(),
      ),
    ),
  }));
  const { t } = useTranslation();
  const isDisabled = true;

  return (
    <DepositProvider>
      {(state: IDepositState, dispatch: React.Dispatch<IDepositAction> | null) => {
        if (route.state.depositMethod && state.method !== route.state.depositMethod) {
          dispatch?.(depositActionCreators.setMethod(route.state.depositMethod));
        }

        return (
          <Container className="deposit-page-wrapper">
            <Row>
              <Col xs={12}>
                <PageTitle title={`${t('Deposit')}`} />
                {route.state.depositResult ? (
                  <DepositSuccessFailure result={route.state.depositResult} />
                ) : (
                  <>
                    {!state.isAmountSelected && (
                      <Tabs
                        activeTab={state.method ?? EDepositMethods.creditCard}
                        isVertical={true}
                        disabledAll={isDisabled}
                        onChange={(e) => {
                          if (dispatch && e.anchor) {
                            dispatch?.(depositActionCreators.setMethod(e.anchor as any));
                          }
                        }}
                      >
                        <Tab
                          label="Visa/MasterCard"
                          subLabel={t('Instant')}
                          labelIcon={EDepositMethods.creditCard}
                          anchor={EDepositMethods.creditCard}
                          disabled={
                            !tradingAccountsCurrencies.some((currency) =>
                              AllowedCurrToMethodMap[EDepositMethods.creditCard].includes(currency),
                            )
                          }
                        >
                          <TabContentChooseAmount />
                        </Tab>
                        <Tab
                          label="Neteller"
                          subLabel={t('Instant')}
                          labelIcon={EDepositMethods.neteller}
                          anchor={EDepositMethods.neteller}
                          disabled={
                            !tradingAccountsCurrencies.some((currency) =>
                              AllowedCurrToMethodMap[EDepositMethods.neteller].includes(currency),
                            )
                          }
                        >
                          <TabContentChooseAmount />
                        </Tab>
                        <Tab
                          label="Webmoney"
                          subLabel={t('Instant')}
                          labelIcon={EDepositMethods.webmoney}
                          anchor={EDepositMethods.webmoney}
                          disabled={
                            !tradingAccountsCurrencies.some((currency) =>
                              AllowedCurrToMethodMap[EDepositMethods.webmoney].includes(currency),
                            )
                          }
                        >
                          <TabContentChooseAmount />
                        </Tab>
                        <Tab
                          label="Skrill"
                          subLabel={t('Instant')}
                          labelIcon={EDepositMethods.skrill}
                          anchor={EDepositMethods.skrill}
                          disabled={
                            !tradingAccountsCurrencies.some((currency) =>
                              AllowedCurrToMethodMap[EDepositMethods.skrill].includes(currency),
                            )
                          }
                        >
                          <TabContentChooseAmount />
                        </Tab>
                        <Tab
                          label={t('Wire Bank Transfer')}
                          subLabel={t('1 3 days')}
                          labelIcon={EDepositMethods.bankWire}
                          anchor={EDepositMethods.bankWire}
                          disabled={
                            !tradingAccountsCurrencies.some((currency) =>
                              AllowedCurrToMethodMap[EDepositMethods.bankWire].includes(currency),
                            )
                          }
                        >
                          <TabContentBankWire />
                        </Tab>
                      </Tabs>
                    )}
                    {state.isAmountSelected && <DetailsFormWrapper />}
                  </>
                )}
              </Col>
            </Row>
            {!env.PRODUCTION && <pre>{JSON.stringify(state, null, '\t')}</pre>}
          </Container>
        );
      }}
    </DepositProvider>
  );
});
