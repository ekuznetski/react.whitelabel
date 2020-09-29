import { Button, DatePicker, PageTitle, Select, Tab, Tabs } from '@components/shared';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import './TransactionStatement.scss';

enum EFields {
  'filter' = 'filter',
  'operation_type' = 'operation_type',
}

export const TransactionStatement = memo(function TransactionStatement() {
  const validationSchema = Yup.object().shape({
    filter: Yup.array<Moment>(),
  });
  const operationTypes = [
    { label: 'Deposits', value: 'deposits' },
    { label: 'Withdrawals', value: 'withdrawal' },
    { label: 'Trades', value: 'trades' },
  ];
  const recentTransactionsFilter = [
    {
      label: 'Last 20 Transactions',
      value: [moment('1.1.2000').startOf('month'), moment()],
    },
    {
      label: 'This Month Transactions',
      value: [moment().startOf('month'), moment()],
    },
    {
      label: 'Last Month Transactions',
      value: [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    },
  ];
  const monthlyTransactionsFilter = Array.apply(0, Array(12))
    .map((_, i) => moment().subtract(i, 'months'))
    .map((_moment, idx) => ({
      label: _moment.format('MMMM YYYY'),
      value: [moment(_moment).startOf('month').startOf('day'), _moment.endOf('month')],
    }));

  function Submit(values: any, formikHelpers: FormikHelpers<any>) {
    //date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    //date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    alert('Call `clients/bankingStatements` API.');
  }

  return (
    <Container className="transaction-statement-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title="Transactional Statement" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-10 px-9">
          <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={Submit}>
            {({ setFieldValue }: FormikProps<any>) => {
              return (
                <Form className="transaction-statement__form">
                  <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                  <Tabs
                    className="statement__tabs"
                    alignNavigation="left"
                    onChange={() => setFieldValue(EFields.filter, undefined)}
                  >
                    <Tab anchor="recent" label="Recent" disabled={true}>
                      <Select label="Choose a filter" options={recentTransactionsFilter} name={EFields.filter} />
                    </Tab>
                    <Tab anchor="monthly" label="Monthly">
                      <Select label="Choose the period" options={monthlyTransactionsFilter} name={EFields.filter} />
                    </Tab>
                    <Tab anchor="range" label="Custom Range">
                      <DatePicker label="Choose date range" name={EFields.filter} range={true} />
                    </Tab>
                  </Tabs>
                  <Button type="submit">Get Trading Statement</Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
});
