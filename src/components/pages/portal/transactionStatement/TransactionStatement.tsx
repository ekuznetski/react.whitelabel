import { Button, DatePicker, MultiSelect, PageTitle, Select, Svg, Tab, Tabs } from '@components/shared';
import { ENotificationType } from '@domain/enums';
import { EActionTypes, IDataStore, IStore, ac_fetchTransactionalStatements, ac_showNotification } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import moment, { Moment } from 'moment';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { StatementSearchResultSection } from './components';
import { config } from './';
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

  const monthlyTransactionsFilter = Array.apply(0, Array(12))
    .map((_, i) => moment().subtract(i + 1, 'months'))
    .map((_moment, idx) => ({
      label: _moment.format('MMMM YYYY'),
      value: [moment(_moment).startOf('month').startOf('day'), _moment.endOf('month')],
    }));

  function Submit(values: FormikValues) {
    const data = {
      from: values.filter[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      to: values.filter[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ...values.operation_type.reduce((acc: {}, value: string) => Object.assign(acc, { [value]: true }), {}),
    };

    dispatch(
      ac_fetchTransactionalStatements(
        data,
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('Requested statements are successfully loaded'),
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Error'),
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="transaction-statement-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Transactional Statement')} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-8 px-6 py-md-10 px-md-9">
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
                    <MultiSelect
                      placeholder="Account Type"
                      options={config.operationTypes}
                      name={EFields.operation_type}
                    />
                    <Tabs
                      className="statement__tabs"
                      alignNavigation="left"
                      onChange={() => resetForm({ values: { ...values, [EFields.filter]: '' } })}
                    >
                      <Tab anchor="recent" label={t('Recent')}>
                        <Select
                          label={t('Choose a filter')}
                          options={config.recentTransactionsFilter}
                          name={EFields.filter}
                        />
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
                    <Button type="submit" loadingOnAction={EActionTypes.fetchTransactionalStatements}>
                      {t('Get Trading Statement')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
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
        <Col xs={12} lg={10} xl={8} className="px-0">
          <div className="statement text-center">
            {statements && (statements.deposits.length || statements.trades.length || statements.withdrawals.length) ? (
              <Col>
                <StatementSearchResultSection className="mb-9" title={t('Deposits')} statements={statements.deposits} />
                <StatementSearchResultSection
                  className="mb-9"
                  title={t('Withdrawals')}
                  statements={statements.withdrawals}
                />
                <StatementSearchResultSection className="mb-9" title={t('Trades')} statements={statements.trades} />
              </Col>
            ) : (
              <Svg
                href="no-filter"
                width={160}
                height={160}
                style={{ fill: '#b0b4b9' }}
                className="d-block mx-auto mt-10"
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
});
