import { Button } from '@components/shared';
import { FieldValidators } from '@domain';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { BillingDetailsModal, DetailsHeader } from '..';
import { DepositContext, useDepositDispatch, useDepositState } from '../../deposit.context';
import { ac_addDeposit, IStore } from '@store';
import { ELanguage, EDepositMethodCode, ETradingType } from '@domain/enums';
import { ISkrillDepositRequest, IWebmoneyDepositRequest } from '@domain/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { MClientProfile } from '@domain/models';
import cheerio from 'cheerio';

export function WebmoneyMethod() {
  const dispatch = useDispatch();
  const { account, amount, billingDetails } = useDepositState();
  const { profile, locale } = useSelector<IStore, { profile: MClientProfile; locale: ELanguage }>((state) => ({
    profile: state.data.client.profile,
    locale: state.app.route.locale,
  }));
  const { t } = useTranslation();
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);

  function onClickHandler(e: React.MouseEvent) {
    e.preventDefault();
    setIsBillingDetailsModalOpen(true);
  }

  function submit() {
    if (account && amount) {
      const preparedData: IWebmoneyDepositRequest = {
        PaymentMethod: EDepositMethodCode.webmoney,
        amount: amount,
        currency: account?.currency as string,
      };
      if (account && account?.type !== ETradingType.fake) {
        Object.assign(preparedData, {
          trade_account: account.accountId?.toString() as string,
          trade_platform: account.platform as string,
        });
      }
      const form = document.createElement('form');

      document.body.appendChild(form);

      dispatch(
        ac_addDeposit<IWebmoneyDepositRequest>(preparedData, (e) => {
          // window.location = e.split('action="')[1].split('"')[0];
        }),
      );
    }
  }

  return (
    <>
      <div className="form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Row>
          <Col xs={12}>
            <Button onClick={submit}>{t('Deposit')}</Button>
          </Col>
        </Row>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <Row className="note">
          <Col xs={12} sm={6}>
            {t('Edit your')}{' '}
            <a href="#" onClick={onClickHandler}>
              {t('billing address')}
            </a>
          </Col>
        </Row>
      </div>
      <BillingDetailsModal isModalOpen={isBillingDetailsModalOpen} setModalOpen={setIsBillingDetailsModalOpen} />
    </>
  );
}
