import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Deposit.scss';
import { DatePicker, PageTitle, Select, Tab, TabLabel, Tabs } from '@components/shared';
import { DetailsFormWrapper, TabContentBankWire, TabContentChooseAmount, TabLabelDepositMethod } from './components';
import { depositActionCreators, DepositContextWrapper, IDepositAction, IDepositState } from './depositContext';
import { EDepositMethods } from '@domain/enums';

export const Deposit = memo(function Deposit(props) {
  return (
    <DepositContextWrapper>
      {(state: IDepositState, dispatch: React.Dispatch<IDepositAction> | null) => {
        return (
          <Container className="deposit-page-wrapper">
            <Row>
              <Col xs={12}>
                <PageTitle title="Deposit" />
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
                        <TabLabelDepositMethod title="Visa/MasterCard" subTitle="Instant" icon="visa-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.netteller}>
                      <TabLabel>
                        <TabLabelDepositMethod title="Neteller" subTitle="Instant" icon="webmoney-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.skrill}>
                      <TabLabel>
                        <TabLabelDepositMethod title="Skrill" subTitle="Instant" icon="webmoney-with-bg" />
                      </TabLabel>
                      <TabContentChooseAmount />
                    </Tab>
                    <Tab anchor={EDepositMethods.bankWire}>
                      <TabLabel>
                        <TabLabelDepositMethod
                          title="Wire Bank Transfer"
                          subTitle="1 - 3 days"
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
