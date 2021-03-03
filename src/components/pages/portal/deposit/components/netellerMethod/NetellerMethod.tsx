import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { EDepositMethodCode, ETradingType } from '@domain/enums';
import { INetellerDepositRequest } from '@domain/interfaces';
import { ac_addDeposit } from '@store';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { DetailsHeader } from '..';
import { useDepositState } from '../../deposit.context';
import { NetellerInfoModal } from '../netellerInfoModal/NetellerInfoModal';

enum EFields {
  'account' = 'account',
  'password' = 'password',
}

export function NetellerMethod() {
  const { account, amount } = useDepositState();
  const { t } = useTranslation();
  const [isNetellerModalOpen, setNetellerModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    [EFields.account]: FieldValidators.requiredString,
    [EFields.password]: FieldValidators.requiredString,
  });

  return (
    <>
      <div className="form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Formik
          initialValues={{
            [EFields.account]: 'test@test.com',
            [EFields.password]: '12312312',
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            if (account && amount) {
              const preparedData: INetellerDepositRequest = {
                amount: amount,
                currency: account?.currency as string,
                PaymentMethod: EDepositMethodCode.neteller,
                net_username: data[EFields.account],
                net_password: data[EFields.password],
              };
              if (account && account.type !== ETradingType.fake) {
                Object.assign(preparedData, {
                  trade_platform: account?.platform as string,
                  trade_account: account?.accountId?.toString() as string,
                });
              }
              dispatch(ac_addDeposit<INetellerDepositRequest>(preparedData));
            }
          }}
        >
          {(props: any) => {
            const { values, setFieldValue, errors } = props;
            return (
              <Form className="m-auto form">
                <Row>
                  <Col xs={12}>
                    <Input label={t('Email or Account ID')} name={EFields.account} />
                  </Col>
                  <Col xs={12}>
                    <Input label={t('Secure ID or Authentication Code')} name={EFields.password} />
                  </Col>
                  <Col xs={12}>
                    <Button type="submit">{t('Deposit')}</Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto text-center">
        <Row className="note">
          <Col xs={12}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setNetellerModalOpen(true);
              }}
            >
              Notes
            </a>{' '}
            {t('on Deposits and Withdrawals by Neteller online wallet')}
          </Col>
        </Row>
      </div>
      <NetellerInfoModal isModalOpen={isNetellerModalOpen} setModalOpen={setNetellerModalOpen} />
    </>
  );
}
