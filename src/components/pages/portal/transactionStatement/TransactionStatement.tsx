import { Button, DatePicker, ITabs, PageTitle, Select, Tab, TabLabel, Tabs } from '@components/shared';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import './TransactionStatement.scss';

enum EFields {
  'date' = 'date',
  'operation_type' = 'operation_type',
}

export const TransactionStatement = memo(function TransactionStatement() {
  const validationSchema = Yup.object().shape({
    date: Yup.array(),
  });
  const operationTypes = [
    { label: 'Deposits', value: 'deposits' },
    { label: 'Withdrawals', value: 'withdrawal' },
    { label: 'Trades', value: 'trades' },
  ];

  // 	<Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
  // <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
  // <DatePicker label="Choose date range" name={EFields.date} range={true} />

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
            {({ values }: FormikProps<any>) => {
              return (
                <Form className="transaction-statement__form">
                  <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                  <Tabs className="statement__tabs" alignNavigation="left">
                    <Tab anchor="recent" label="Recent">
                      <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                    </Tab>
                    <Tab anchor="monthly" label="Monthly">
                      <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                    </Tab>
                    <Tab anchor="range">
                      <TabLabel>Custom Range</TabLabel>
                      <DatePicker label="Choose date range" name={EFields.date} range={true} />
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
