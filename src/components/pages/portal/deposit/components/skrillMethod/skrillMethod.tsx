import React, { useContext, useState } from 'react';
import './TabContentChooseAmount.scss';
import { ECurrency, ECurrencySymbol } from '@domain/enums';
import * as Yup from 'yup';
import { Form, Formik, useFormikContext } from 'formik';
import { Button, Input, Radio, TradingAccountsSelect } from '@components/shared';
import { useSelector } from 'react-redux';
import { IStore } from '@store';
import { MTradingAccount } from '@domain/models';
import { availableAmounts, depositActionCreators, DepositContext } from '../../depositContext';
import { FieldValidators } from '@domain';

enum EFields {
  'account' = 'account',
  'secureId' = 'secureId',
}

export function SkrillMethod() {
  const { dispatch } = useContext<any>(DepositContext);

  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    account: FieldValidators.requiredString,
    secureId: FieldValidators.requiredString,
  });

  return (
    <>
      <div className="choose-amount-wrapper py-10 px-9">
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            dispatch(depositActionCreators.setDepositDetails(data));
          }}
        >
          {(props: any) => {
            const { values, setFieldValue } = props;

            return (
              <Form className="m-auto form fadein-row">
                <Input label="Email or Account ID" />
                <Input label="Secure ID or Authentication Code" />
                <Button type="submit">Deposit</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      Notes on Deposits and Withdrawals by Neteller online wallet
    </>
  );
}
