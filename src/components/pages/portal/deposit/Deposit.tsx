import { PageTitle, Tab, TabLabel, Tabs } from '@components/shared';
import { EDepositMethods } from '@domain/enums';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DetailsFormWrapper, TabContentBankWire, TabContentChooseAmount, TabLabelDepositMethod } from './components';
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
                    <Tab anchor={EDepositMethods.creditCard}>
                      <TabLabel>
                        <TabLabelDepositMethod title="Visa/MasterCard" subTitle={t('Instant')} icon="visa-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.netteller}>
                      <TabLabel>
                        <TabLabelDepositMethod title="Neteller" subTitle={t('Instant')} icon="webmoney-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.skrill}>
                      <TabLabel>
                        <TabLabelDepositMethod title="Skrill" subTitle={t('Instant')} icon="webmoney-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.bankWire}>
                      <TabLabel>
                        <TabLabelDepositMethod
                          title={t('Wire Bank Transfer')}
                          subTitle={t('1 3 days')}
                          icon="webmoney-with-bg"
                        />
                      </TabLabel>
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
          </Container>
        );
      }}
    </DepositContextWrapper>
  );
});
