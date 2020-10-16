import { PageTitle, Tab, Tabs } from '@components/shared';
import { EDepositMethods } from '@domain/enums';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DetailsFormWrapper, TabContentBankWire, TabContentChooseAmount } from './components';
import './Deposit.scss';
import { depositActionCreators, DepositContextWrapper, IDepositAction, IDepositState } from './depositContext';

export const Deposit = memo(function Deposit(props) {
  const { t } = useTranslation();

  return (
    <DepositContextWrapper>
      {(state: IDepositState, dispatch: React.Dispatch<IDepositAction> | null) => {
        return (
          <Container className="deposit-page-wrapper">
            <Row>
              <Col xs={12}>
                <PageTitle title={t('Deposit')} />
                {!state.isAmountSelected && (
                  <Tabs
                    activeTab={state.method ?? EDepositMethods.creditCard}
                    isVertical={true}
                    onChange={(e) => {
                      if (dispatch && e.anchor) dispatch?.(depositActionCreators.setMethod(e.anchor as any));
                    }}
                  >
                    <Tab
                      label="Visa/MasterCard"
                      subLabel={t('Instant')}
                      labelIcon="visa-with-bg"
                      anchor={EDepositMethods.creditCard}
                    >
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab
                      label="Neteller"
                      subLabel={t('Instant')}
                      labelIcon="webmoney-with-bg"
                      anchor={EDepositMethods.netteller}
                    >
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab
                      label="Skrill"
                      subLabel={t('Instant')}
                      labelIcon="webmoney-with-bg"
                      anchor={EDepositMethods.skrill}
                    >
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab
                      label={t('Wire Bank Transfer')}
                      subLabel={t('1 3 days')}
                      labelIcon="webmoney-with-bg"
                      anchor={EDepositMethods.bankWire}
                    >
                      <TabContentBankWire />
                    </Tab>
                  </Tabs>
                )}
                {state.isAmountSelected && <DetailsFormWrapper />}
              </Col>
            </Row>
            <pre>{JSON.stringify(state.account)}</pre>
            <pre>{state.amount}</pre>
            <pre>{state.method?.toString()}</pre>
            <pre>{state.isAmountSelected?.toString()}</pre>
            <pre>
              {state.depositDetails &&
                Object.keys(state.depositDetails).map((el) => (
                  <div key={el}>
                    {el}: {state.depositDetails[el]}
                  </div>
                ))}
            </pre>
          </Container>
        );
      }}
    </DepositContextWrapper>
  );
});
