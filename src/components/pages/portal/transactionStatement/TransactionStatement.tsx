import { Button, DatePicker, MultiSelect, PageTitle, Select, Tab, Tabs } from '@components/shared';
import { ENotificationType } from '@domain/enums';
import { IClientProfile } from '@domain/interfaces';
import { ac_fetchTransactionalStatements, ac_showNotification, IStore } from '@store';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import moment, { Moment } from 'moment';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './TransactionStatement.scss';

enum EFields {
  'filter' = 'filter',
  'operation_type' = 'operation_type',
}

export const TransactionStatement = memo(function TransactionStatement() {
  const { profile } = useSelector<IStore, { profile: IClientProfile }>((state) => ({
    profile: state.data.client.profile,
  }));
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    operation_type: Yup.array<string>().required('This field is required'),
    filter: Yup.array<Moment>().required('This field is required'),
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

  function Submit(values: FormikValues) {
    const data = {
      startDate: values.filter[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endDate: values.filter[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ...values.operation_type.reduce((acc: {}, value: string) => Object.assign(acc, { [value]: true }), {}),
    };

    dispatch(
      ac_fetchTransactionalStatements(
        data,
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              context: 'Requested statements are successfully loaded',
            }),
          );
        },
        () => dispatch(ac_showNotification({ type: ENotificationType.failure, context: 'Error' })),
      ),
    );
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
          <Formik
            initialValues={{
              operation_type: '',
              filter: '',
            }}
            validationSchema={validationSchema}
            onSubmit={Submit}
          >
            {({ values, errors, resetForm }: FormikProps<any>) => {
              console.log(values, errors);
              return (
                <Form className="transaction-statement__form">
                  <MultiSelect placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                  <Tabs
                    className="statement__tabs"
                    alignNavigation="left"
                    onChange={() => resetForm({ values: { ...values, [EFields.filter]: '' } })}
                  >
                    <Tab anchor="recent" label="Recent">
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
      <Row>
        <Col xs={12} md={9} lg={7} xl={6} className="py-10 px-9">
          <div className="statements">
            
          </div>
        </Col>
      </Row>
    </Container>
  );
});
