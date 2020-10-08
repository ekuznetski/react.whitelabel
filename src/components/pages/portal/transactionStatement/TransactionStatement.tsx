import { Button, DatePicker, MultiSelect, PageTitle, Select, Svg, Svg, Tab, Tabs } from '@components/shared';
import { ENotificationType } from '@domain/enums';
import { IClientProfile } from '@domain/interfaces';
import { ac_fetchTransactionalStatements, ac_showNotification, IDataStore, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import moment, { Moment } from 'moment';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { StatementSearchResultSection } from './components';
import './TransactionStatement.scss';

enum EFields {
  'filter' = 'filter',
  'operation_type' = 'operation_type',
}

export const TransactionStatement = memo(function TransactionStatement() {
  const { statements } = useSelector<IStore, Partial<IDataStore['client']>>((state) => ({
    statements: state.data.client.statements,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    operation_type: Yup.array<string>().required(t('This field is required')),
    filter: Yup.array<Moment>().required(t('This field is required')),
  });
  const operationTypes = [
    { label: t('Deposits'), value: 'deposits' },
    { label: t('Withdrawals'), value: 'withdrawal' },
    { label: t('Trades'), value: 'trades' },
  ];
  const recentTransactionsFilter = [
    {
      label: t('Last 20 Transactions'),
      value: [moment('1.1.2000').startOf('month'), moment()],
    },
    {
      label: t('This Month Transactions'),
      value: [moment().startOf('month'), moment()],
    },
    {
      label: t('Last Month Transactions'),
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
              context: t('Requested statements are successfully loaded'),
            }),
          );
        },
        () => dispatch(ac_showNotification({ type: ENotificationType.failure, context: 'Error' })),
      ),
    );
  }

  console.log(statements);

  return (
    <Container className="transaction-statement-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Transactional Statement')} />
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
              return (
                <Form className="transaction-statement__form">
                  <MultiSelect placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
                  <Tabs
                    className="statement__tabs"
                    alignNavigation="left"
                    onChange={() => resetForm({ values: { ...values, [EFields.filter]: '' } })}
                  >
                    <Tab anchor="recent" label={t('Recent')}>
                      <Select label={t('Choose a filter')} options={recentTransactionsFilter} name={EFields.filter} />
                    </Tab>
                    <Tab anchor="monthly" label={t('Monthly')}>
                      <Select
                        label={t('Choose the period')}
                        options={monthlyTransactionsFilter}
                        name={EFields.filter}
                      />
                    </Tab>
                    <Tab anchor="range" label={t('Range')}>
                      <DatePicker label={t('Choose date range')} name={EFields.filter} range={true} />
                    </Tab>
                  </Tabs>
                  <Button type="submit">{t('Get Trading Statement')}</Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <PageTitle
            title={t('Search Results')}
            description={t('Statement Filter Result Note')}
            showBackButton={false}
          />
        </Col>
        <Col xs={12} className="px-0">
          <div className="statement text-center">
            {statements ? (
              <>
                <StatementSearchResultSection title={t('Deposits')} statements={statements.deposits} />
                <StatementSearchResultSection title={t('Withdrawals')} statements={statements.withdrawals} />
                <StatementSearchResultSection title={t('Trades')} statements={statements.trades} />
              </>
            ) : (
              <Svg
                href="no-filter.svg"
                width={160}
                height={160}
                style={{ fill: '#b0b4b9' }}
                className="d-block mx-auto"
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
});
