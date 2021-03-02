import { PageTitle, Tab, Tabs } from '@components/shared';
import { AllowedCurrToMethodMap, ECurrencyCode, EDepositMethodCode, EDepositMethodIcon } from '@domain/enums';
import { env } from '@env';
import { IAppStore, IStore } from '@store';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DepositSuccessFailure, DetailsFormWrapper, TabContentBankWire, TabContentChooseAmount } from './components';
import { DepositProvider, IDepositAction, IDepositState, depositActionCreators } from './deposit.context';
import './Deposit.scss';
import { IClientSettings } from '@domain/interfaces';

export const Deposit = memo(function Deposit() {
  const { allowed_deposit_methods: allowedMethods, route, tradingAccountsCurrencies } = useSelector<
    IStore,
    { tradingAccountsCurrencies: ECurrencyCode[] } & Pick<IAppStore, 'route'> &
      Pick<IClientSettings, 'allowed_deposit_methods'>
  >((state) => ({
    allowed_deposit_methods: state.data.client.settings?.allowed_deposit_methods ?? [],
    route: state.app.route,
    tradingAccountsCurrencies: Array.from(
      state.data.tradingData.accounts.reduce(
        (currencies, account) => currencies.add(account.currency),
        new Set<ECurrencyCode>(),
      ),
    ),
  }));
  const { t } = useTranslation();
  // const isDisabled = true;

  return (
    <DepositProvider>
      {(state: IDepositState, dispatch: React.Dispatch<IDepositAction> | null) => {
        if (route.state?.depositMethod && state.method !== route.state.depositMethod) {
          dispatch?.(depositActionCreators.setMethod(route.state.depositMethod));
        }

        return (
          <Container className="deposit-page-wrapper">
            <Row>
              <Col xs={12}>
                <PageTitle title={`${t('Deposit')}`} />
                {route.state?.depositResult ? (
                  <DepositSuccessFailure result={route.state.depositResult} />
                ) : (
                  <>
                    {!state.isAmountSelected && (
                      <Tabs
                        activeTab={allowedMethods[0] ?? EDepositMethodCode.creditCard}
                        isVertical={true}
                        // disabledAll={isDisabled}
                        onChange={(e) => {
                          if (dispatch && e.anchor) {
                            dispatch?.(depositActionCreators.setMethod(e.anchor as any));
                          }
                        }}
                      >
                        {allowedMethods.includes(EDepositMethodCode.creditCard) && (
                          <Tab
                            label="Visa/MasterCard"
                            subLabel={t('Instant')}
                            labelIcon={EDepositMethodIcon[EDepositMethodCode.creditCard]}
                            anchor={EDepositMethodCode.creditCard}
                            disabled={
                              !tradingAccountsCurrencies.some((currency) =>
                                AllowedCurrToMethodMap[EDepositMethodCode.creditCard].includes(currency),
                              )
                            }
                          >
                            <TabContentChooseAmount />
                          </Tab>
                        )}
                        {allowedMethods.includes(EDepositMethodCode.neteller) && (
                          <Tab
                            label="Neteller"
                            subLabel={t('Instant')}
                            labelIcon={EDepositMethodIcon[EDepositMethodCode.neteller]}
                            anchor={EDepositMethodCode.neteller}
                            disabled={
                              !tradingAccountsCurrencies.some((currency) =>
                                AllowedCurrToMethodMap[EDepositMethodCode.neteller].includes(currency),
                              )
                            }
                          >
                            <TabContentChooseAmount />
                          </Tab>
                        )}
                        {allowedMethods.includes(EDepositMethodCode.webmoney) && (
                          <Tab
                            label="Webmoney"
                            subLabel={t('Instant')}
                            labelIcon={EDepositMethodIcon[EDepositMethodCode.webmoney]}
                            anchor={EDepositMethodCode.webmoney}
                            disabled={
                              !tradingAccountsCurrencies.some((currency) =>
                                AllowedCurrToMethodMap[EDepositMethodCode.webmoney].includes(currency),
                              )
                            }
                          >
                            <TabContentChooseAmount />
                          </Tab>
                        )}

                        {allowedMethods.includes(EDepositMethodCode.skrill) && (
                          <Tab
                            label="Skrill"
                            subLabel={t('Instant')}
                            labelIcon={EDepositMethodIcon[EDepositMethodCode.skrill]}
                            anchor={EDepositMethodCode.skrill}
                            disabled={
                              !tradingAccountsCurrencies.some((currency) =>
                                AllowedCurrToMethodMap[EDepositMethodCode.skrill].includes(currency),
                              )
                            }
                          >
                            <TabContentChooseAmount />
                          </Tab>
                        )}

                        {allowedMethods.includes(EDepositMethodCode.bankWire) && (
                          <Tab
                            label={t('Wire Bank Transfer')}
                            subLabel={t('1 3 days')}
                            labelIcon={EDepositMethodIcon[EDepositMethodCode.bankWire]}
                            anchor={EDepositMethodCode.bankWire}
                            disabled={
                              !tradingAccountsCurrencies.some((currency) =>
                                AllowedCurrToMethodMap[EDepositMethodCode.bankWire].includes(currency),
                              )
                            }
                          >
                            <TabContentBankWire />
                          </Tab>
                        )}
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
